function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      var initial_array = data.samples;
      var metadata_array = data.metadata;
      var initial_metadata_results = metadata_array[0]
      var initial_results = initial_array[0];
      var initial_results_array = [initial_results]

      console.log(initial_results);

      // Initialize panel
      var PANEL = d3.select("#sample-metadata");

      PANEL.html("");
      PANEL.append("h6").text(`ID: ${initial_metadata_results.id}`)
      PANEL.append("h6").text(`ETHNICITY ${initial_metadata_results.ethnicity}`);
      PANEL.append("h6").text(`GENDER: ${initial_metadata_results.gender}`);
      PANEL.append("h6").text(`AGE: ${initial_metadata_results.age}`)
      PANEL.append("h6").text(`LOCATION: ${initial_metadata_results.location}`)
      PANEL.append("h6").text(`BBTYPE: ${initial_metadata_results.bbytpe}`)
      PANEL.append("h6").text(`WFREQ: ${initial_metadata_results.wfreq}`)
      
      var sorted_initial_results = initial_results_array.sort((a,b) => a.sample_values - b.sample_values)
      var topTenInitialSampleValues = sorted_initial_results[0].sample_values.slice(0,10);
      var topTenInitialIds = sorted_initial_results[0].otu_ids.slice(0,10);

      var id_labels = topTenInitialIds.map(String);

      var initial_sample_values = topTenInitialSampleValues;
      // Initialize basic scatter plot
      var initialBarData = {
        x: initial_sample_values,
        y: id_labels,
        type: 'bar',
        orientation: 'h'
      };

      var initialBarDataLayout = {
        title: 'Top 10 Bacterial Species (OTU)',
        yaxis: {
          type: 'category',
          title: 'OTUs',
          list: {
          autorange: 'reverse'
          }
        }

      }
      // Initialize basic scatter plot
      var initialBubbleData = {
        x: id_labels,
        y: initial_sample_values,
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: initial_sample_values,
          color: sorted_initial_results[0].otu_ids
        }
      };

      var scatterLayout = {
        title: id_labels,
        showlegend: false,
        xaxis: {
          title: {
            text: 'OTU ID',
          }
        },
        height: 600,
        width: 1600
      };
      // Initialize basic gauge 
      // var initialGaugeData = {
      //   type: 'indicator',
      //   //value: 
      //   mode: 'gauge+number',
      //   title: 'Washing Frequency',
      //   gauge: {
      //     axis: {
      //       range: [null, 9],
      //       tickwidth: 1,
      //       steps: [
      //         {range: [0,1], color: '##657F63'},
      //         {range: [1,2], color: '##708F6E'},
      //         {range: [2,3], color: '##7BA379'},
      //         {range: [3,4], color: '##83B280'},
      //         {range: [4,5], color: '##8CC489'},
      //         {range: [5,6], color: '##94D690'},
      //         {range: [6,7], color: '##98E493'},
      //         {range: [7,8], color: '##A0F29A'},
      //         {range: [8,9], color: '##9DFF96'}],
      //     }
      //   }};
      //   var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };


      // Bar Plot initializing
      Plotly.newPlot('barPlot', [initialBarData], initialBarDataLayout);
      // Scatter Plot initializing
      Plotly.newPlot('scatterPlot', [initialBubbleData], scatterLayout);
      // Plot initial gauge
      //Plotly.newPlot('gauge', [initialGaugeData], gaugeLayout);
  })}
  
  init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
};

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");

      // Populate panel after input
      PANEL.html("");
      PANEL.append("h6").text(`ID: ${result.id}`)
      PANEL.append("h6").text(`ETHNICITY ${result.ethnicity}`);
      PANEL.append("h6").text(`GENDER: ${result.gender}`);
      PANEL.append("h6").text(`AGE: ${result.age}`)
      PANEL.append("h6").text(`LOCATION: ${result.location}`)
      PANEL.append("h6").text(`BBTYPE: ${result.bbytpe}`)
      PANEL.append("h6").text(`WFREQ: ${result.wfreq}`)
    });
  };

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
    var sample_value = data.samples;
    var sampleArray = sample_value.filter(sampleObj => sampleObj.id == sample);
    var results = sampleArray[0]

    console.log(results);

    var results_array = [results]

    var sorted_results = results_array.sort((a,b) => a.sample_values - b.sample_values)
    var topTenSampleValues = sorted_results[0].sample_values.slice(0,10);
    var topTenIds = sorted_results[0].otu_ids.slice(0,10);

    var id_labels = topTenIds.map(String);
    
    // Bar plot after input
    var barData = {
      x: topTenSampleValues,
      y: id_labels,
      type: 'bar',
      orientation: 'h'
    };

    var barDataLayout = {
      title: 'Top 10 Bacterial Species (OTU)',
      yaxis: {
        type: 'category',
        title: 'OTUs',
        list: {
        autorange: 'reverse'
        }
      }

    }
    // Generate bar plot after input
    Plotly.newPlot('barPlot', [barData], barDataLayout);

    // Scatter Plot after input
    var bubbleData = {
      x: id_labels,
      y: topTenSampleValues,
      type: 'scatter',
      mode: 'markers',
      marker: {
        size: topTenSampleValues,
        color: sorted_results[0].otu_ids
      }
    };

    var scatterLayout = {
      title: id_labels,
      showlegend: false,
      xaxis: {
        title: {
          text: 'OTU ID',
        }
      },
      height: 600,
      width: 1600
    };
    // Regenerate scatter after input
    Plotly.newPlot('scatterPlot', [bubbleData], scatterLayout);
    });
};