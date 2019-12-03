// Belly Button Biodiversity - Plotly.js

function buildMetadata(sample) {

  // @TODO: Complete the Following Function that Builds the Metadata Panel

  // #1 Use `d3.json` to Fetch the Metadata for a Sample
  // #2 Use d3 to Select the Panel with id of `#sample-metadata`
  // #3 Use `.html("") to Clear any Existing Metadata

  // #4
  // Use `Object.entries` to Add Each Key & Value Pair to the Panel
  // Hint: Inside the Loop, Use d3 to Append New 
  // tags for Each Key-Value in the Metadata

  // #5 BONUS: Build the Gauge Chart


    // #1
    d3.json(`/metadata/${sample}`).then((data) => {
        // #2
        var id_panel = d3.select("#sample-metadata");
        // #3
        id_panel.html("");
        // #4
        Object.entries(data).forEach(([key, value]) => {
          id_panel.append("h6").text(`${key}:${value}`);
        })
        // #5
        //buildGauge(data.WFREQ);
    })
}

function buildCharts(sample) {

  // #1 @TODO: Use `d3.json` to Fetch the Sample Data for the Plots
  // #2 @TODO: Build a Bubble Chart Using the Sample Data
  // #3 @TODO: Build a Pie Chart

  // #4
  // HINT: Use slice() to Grab the Top 10 sample_values,
  // otu_ids, and otu_labels (10 Each)



  // #1
  d3.json(`/samples/${sample}`).then((data) => {
    // #2
    const ids = data.otu_ids;
    const labels = data.otu_labels;
    const sample = data.sample_values;

    // #3
    let bubbleframe = {
      margin: { t: 0 },
      hovermode: "closests",
      xaxis: { title: "OTU ID"}
    }

    let bubbleData = [
      {
        x: ids,
        y: sample,
        text: labels,
        mode: "markers",
        marker: {
          size: sample,
          color: ids,
          colorscale: "Earth"
        }
      }
    ]

    Plotly.plot("bubble", bubbleData, bubbleframe);

    // #4
    let pie_data = 
      {
        values: sample.slice(0, 10),
        labels: id.slice(0, 10),
        hovertext: label.slice(0, 10),
        hoverinfo: "hovertext",
        type: "pie"
      };
    
    
    let pie_frame = {
      margin: { t: 0, l: 0 }
    };

    Plotly.plot("pie", pie_Data, pie_frame)
})
}

function init() {
  // Grab a Reference to the Dropdown Select Element
  var selector = d3.select("#selDataset");

  // Use the List of Sample Names to Populate the Select Options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the First Sample from the List to Build Initial Plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch New Data Each Time a New Sample is Selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the Dashboard
init();