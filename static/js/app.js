// FUNCTION #1 of 4
function buildCharts(patientID) {

    d3.json("samples.json").then(data => {
        console.log(data);
        // holder for variables in plots
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == patientID);
        var result = resultArray[0];
        // console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        var plot1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0,10).map(x => `OTU ${x}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

        var data1 = [plot1];
        var layout1 = {
            title: "Top 10 OTU Values",
            xaxis: {
                title: "# of Values in Sample"
            },
            yaxis: {
                categoryorder: "total ascending"
            }
        };

        Plotly.newPlot("bar", data1, layout1);
    })
};

// FUNCTION #2 of 4
function populateDemoInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        // console.log(data)
    })
}

// FUNCTION #3 of 4
function optionChanged(patientID) {
    console.log(patientID);
    buildCharts(patientID);
    populateDemoInfo(patientID);
}

// FUNCTION #4 of 4
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        buildCharts(patientIDs[0]);
        populateDemoInfo(patientIDs[0]);
    });
};

initDashboard();

