import { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import KeyboardInstructions from './KeyboardInstructions';

import { 
  initializeElementAccess,
  setElementFocusHandler,
  setElementAccessID,

  initializeDescriptionRoot,
  setAccessibilityController,
  scopeDataKeys,
  chartAccessors,
  checkAccessFocus,
  retainAccessFocus
} from '@visa/visa-charts-utils';
import { select } from 'd3-selection';

const convertRowToObject = (row, attrs_map) => {
  let o = {};
  let name = "";
  for (name in attrs_map) {
    let id = attrs_map[name];
    o[name] = row[id].value === "%null%" ? null : row[id].value;
  }
  return o;
};


const App = () => {
  const width = 1000;
  const height = 827;
  const [vizURL, setVizURL] = useState("https://public.tableau.com/views/CoinFlipGame-a11yversion/KeyboardNavTest?:language=en-US&:display_count=n&:origin=viz_share_link&:tabs=n");
  const [viz, setViz] = useState();
  const [sheet, setSheet] = useState();
  const vizContainer = useRef();
  const shadowContainer = useRef();

  const [shouldRedrawWrapper, setRedrawWrapper] = useState(true);
  const title = 'Heads and Tails by Game';
  const description = 'Shows two diverging bar charts for Dad and Daughter, by game, depicting the number of heads and tails flipped by each player.';  

  // on initial load only we call initTableau function
  useEffect(() => {
    // on load we need to set the controller and initialize descriptions
    setParentSVGAccessibility();
    initTableau();
  }, []);

  // set up controller using utils
  // left off here, trying to sort out if we can even just
  // render the controller node with some fake props
  const setParentSVGAccessibility = () => {
    const chartType = 'bar-chart';
    // here we mock the expected chart object since we are not using 
    // VCC, but only the accessibility controller
    const fakeThis = {
        ordinalAccessor: 'Game',
        groupAccessor: 'Game',
        valueAccessor: 'SUM(Number of Records)',
        tooltipLabel: { 
          labelAccessor: ['Game', 'Player',  'SUM(Number of Records)', 'SUM(Heads)', 'SUM(Tails)'],
          labelTitle: ['Game', 'Player', 'Coin Flips', 'Heads', 'Tails'],
          // format: ['','','','']
        },
        dataLabel: {
            labelAccessor: 'SUM(Number of Records)'
        }
    };
    const svgParent = shadowContainer.current.parentNode.parentNode.parentNode;

    initializeDescriptionRoot({
        rootEle: svgParent,
        geomType: 'bar',
        title: title,
        chartTag: chartType,
        uniqueID: 'thisIsATest',
        highestHeadingLevel: 'h5',
        redraw: shouldRedrawWrapper, // needs to be flipped to false after initial draw
        disableKeyNav: false
        // groupName: 'line', // bar chart doesn't use this
    });

    // we can set this to false now that the instructions wrapper was initially drawn
    setRedrawWrapper(false);

    setAccessibilityController({
      node: shadowContainer.current,
      chartTag: chartType, // start by testing with bar-chart, may have to change this though
      title: title,
      description: description,
      uniqueID: 'thisIsATest', // uuid.v4(),
      geomType: 'bar',
      includeKeyNames: true,
      dataKeys: scopeDataKeys(fakeThis, chartAccessors, chartType),
      groupAccessor: fakeThis.groupAccessor,
      disableKeyNav: false
      // groupName: 'node', // bar chart does not include these
      // groupKeys: [], // bar chart does not include these
      // nested: '', // bar chart does not include these
      // recursive: true // bar chart does not include these
    });
  }
  
  const initTableau = () => {
    const vizURL = "https://public.tableau.com/views/CoinFlipGame-a11yversion/KeyboardNavTest?:language=en-US&:display_count=n&:origin=viz_share_link&:tabs=n";
    const options = {
      hideTabs: true,
      width: width,
      height: height,
      onFirstInteractive: () => {
        const dashboard = viz.getWorkbook().getActiveSheet();
        const dashboardSheets = dashboard.getWorksheets();
        const dashboardSheetsData = [];
        const getSummaryDataOptions = { 
          ignoreAliases: false,
          ignoreSelection: false,
          maxRows: 0
        };

        dashboardSheets.map(innerSheet => { 
          setSheet(innerSheet);
          innerSheet.getSummaryDataAsync(getSummaryDataOptions).then((t) => {
            // console.log('in getData()', innerSheet.getName(), t, t.getColumns(), t.getData());
        
            let col_names = [];
            let col_indexes = {};
            let data = [];
        
            //write column names to array
            for (let k = 0; k < t.getColumns().length; k++) {
              col_indexes[t.getColumns()[k].getFieldName()] = k;
        
              // write named array
              col_names.push(t.getColumns()[k].getFieldName());
            }
            // console.log('columns', col_names, col_indexes);
          
            for (let j = 0, len = t.getData().length; j < len; j++) {
              data.push(convertRowToObject(t.getData()[j], col_indexes));
            }
        
            // we need to sort the data to get it in the right order
            data.sort((a, b) => a.Player === b.Player ? +a.Game - +b.Game : a.Player - b.Player);

            // log flat data for testing
            // console.log('flat data', data);
            dashboardSheetsData.push(data);

            // initialize fake stuff based on data  
            drawShadowChart(data, innerSheet);
            // console.log('checking what we got', dashboard, dashboardSheets, dashboardSheetsData, shadowContainer.current);
        });
      });



        // need to check what happens with automatic sized workbooks...
        //console.log(activeSheet.getSize());
        // if (activeSheet.getSize().maxSize) {
        //   this.width = activeSheet.getSize().maxSize.width;
        //   this.height = activeSheet.getSize().maxSize.height;
        // } else {
        //   this.width = 800;
        //   this.height = 800;
        // }

        // this will set the frame size the maximum allowed by the viz
        // need to vet whether this will be a problem with automatic vizzes however
        // see note herein for dashboards as well...
        // https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_sample_resize.html
        // viz.setFrameSize(width, height + 100);

        // add event listeners, have yet to be able to change chord from these though
        // viz.addEventListener(window.tableau.TableauEventName.TAB_SWITCH, this.onTabSwitch);
        // viz.addEventListener(window.tableau.TableauEventName.FILTER_CHANGE, this.onFilterChange);
        // viz.addEventListener(window.tableau.TableauEventName.PARAMETER_VALUE_CHANGE, this.onParameterChange);
        // viz.addEventListener(window.tableau.TableauEventName.MARKS_SELECTION, this.onMarkSelect);
      }
    };

    // Tableau.Viz was erroring, so went back to window.tableau.Viz
    const viz = new window.tableau.Viz(vizContainer.current, vizURL, options);
    setViz(viz);
  }

  // currently this is only firing on mouseover, have to see how
  // we fire hover events in util
  const shadowFocus = (e, d, sheet) => {
    // just for testing let's make em red
    select(e.target).attr('fill', 'red');
    // console.log('rect focused', e, d, sheet, viz);

    // this causes an infinite loop
    sheet.selectMarksAsync("ATTR(Game Level Aria ID)", d["ATTR(Game Level Aria ID)"], window.tableau.SelectionUpdateType.REPLACE);
  }

  const shadowUnfocus = (e, d, sheet) => {
    // just for testing let's make em red
    select(e.target).attr('fill', 'grey');
    // console.log('rect focus removed', e, d, sheet, viz);

    // this causes an infinite loop
    sheet.clearSelectedMarksAsync();
  }


    // since we don't need constancy or anything I think we can just blow it up and redraw everytime. 
    const drawShadowChart = (data, sheet) => {
      // console.log('drawShadowChart', data, sheet);
      // create shadowChart
        const shadowElements = select(shadowContainer.current).append('g').attr('class', 'bar-group');

        // before we bind data, let's dedup what Tableau is sending us, probably a better way to do this
        const dedupData = data.map(d => {
          return { 
            Game: d.Game,
            Player: d.Player,
            ['SUM(Heads)']: d['SUM(Heads)'],
            ['SUM(Number of Records)']: d['SUM(Number of Records)'],
            ['SUM(Tails)']: d['SUM(Tails)'],
            ['ATTR(Game Level Aria ID)']: d['ATTR(Game Level Aria ID)']
          }
        });

        const newData = dedupData.filter((d, i) => { 
          const stringD = JSON.stringify(d);
          return i === dedupData.findIndex(obj => JSON.stringify(obj) === stringD);
        });
  
        // bind data
        const dataBoundToGeometries = shadowElements.selectAll('.bar').data(newData, d => `${d['Game']}-${d['Player']}`);
  
        const shadowEnter = dataBoundToGeometries.enter().append('rect');
        const shadowExit = dataBoundToGeometries.exit();
        const shadowUpdate = dataBoundToGeometries.merge(shadowEnter);
  
        // initialize elements
        shadowEnter
          .attr('class', 'bar')
          .attr('data-id', d => `${d['Game']}-${d['Player']}`)
          .attr('height', 0.01)
          .attr('width', 0.01)
          .attr('x', (_, i) => 0)
          .attr('y', (_, i) => 0)
          .attr('fill', 'grey')
          // .on('click', !this.suppressEvents ? d => this.onClickHandler(d) : null)
          .on('mouseover', (event, d) => shadowFocus(event, d, sheet))
          .on('mouseout', (event, d) => shadowUnfocus(event, d, sheet))
          .each((_d, i, n) => {
            // initialize tabindex, etc.
            initializeElementAccess(n[i]);

            // on the first element set the group stuff
            if ( i === 0 ) { 
              initializeElementAccess(shadowElements.node());

              shadowElements.each((_, i, n) => {
                setElementAccessID({
                  node: n[i],
                  uniqueID: 'thisIsATest'
                });
              });
            }
  
            // next we set the focus and ID of the fake DOM node
            // this should set aria labels as well? 
            setElementFocusHandler({
              node: n[i],
              geomType: 'bar',
              includeKeyNames: true, // tableauExt.settings.get('includeKeyNames'), // this.accessibility.includeDataKeyNames,
              dataKeys: {
                ['Game']: "",
                ['Player']: "",
                // ['SUM(Number of Records)']: '0.[0][0]a', 
                ['SUM(Heads)']: '0.[0][0]a',
                ['SUM(Tails)']: '0.[0][0]a'
              },
              uniqueID: 'thisIsATest', // tableauExt.settings.get('uniqueID'), // this.chartID,
              disableKeyNav: false 
                // this.suppressEvents &&
                // this.accessibility.elementsAreInterface === false &&
                // this.accessibility.keyboardNavConfig &&
                // this.accessibility.keyboardNavConfig.disabled
            });
  
            // give each element an id we can use for selection
            setElementAccessID({
              node: n[i],
              uniqueID: 'thisIsATest', //  tableauExt.settings.get('uniqueID')
            });
  
            // console.log('checking data', _d, n[i]);
            // TODO: we also need to check whether we can write this back to our data array
            // so that we can focus a specific element later on when selected in Tableau
          });
  
          // if we need to we can remove elements no longer needed
          shadowExit.remove();
    }


  return (
    <div className="tableau-keyboard-navigation">
      <div className="o-layout">
        <div className="o-layout--chart">
          <KeyboardInstructions
             uniqueID={'thisIsATest'}
             geomType={'bar'}
             groupName={'bar group'}
             chartTag={'bar-chart'}
             width={800}
             isInteractive={true}
             hasCousinNavigation={true}
             disabled={false}
          />
          <div class="shadow-d3-viz-conatiner">
            <svg ref={shadowContainer} height={1} width={1} />
          </div>
        </div>
      </div>
      <div ref={vizContainer} />
    </div>
  );
}

export default App;
