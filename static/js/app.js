// FUNCTION #1 of 4
function buildCharts(patientID) {

    

    d3.json("samples.json").then(data => {
        console.log(data)
    })
};

// FUNCTION #2 of 4
function populateDemoInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        console.log(data)
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

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
var plot1 = {
    x: sample_values.slice(0,10),
    y: otu_ids.map(x => "OTU ${x}"), 
    text:otu_labels.slice(0,10),
    type: "bar"
    orientation: "h"
};