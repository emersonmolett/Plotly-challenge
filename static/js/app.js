// FUNCTION #1 of 4
function buildCharts(patientID) {

    d3.json("samples.json").then((data) => {
        // console.log(data);
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
            y: otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse(),
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


    // Create a bubble chart that displays each sample

    d3.json("samples.json").then((data) => {
        // console.log(data);
        // holder for variables in plots
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == patientID);
        var result = resultArray[0];
        // console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var plot2 = {
            x: otu_ids.slice(0, 30),
            y: sample_values.slice(0, 30),
            mode: "markers",
            marker: {
                size: sample_values.slice(0, 30),
                color: otu_ids
            },
            text: otu_labels.slice(0, 30)
        };

        var data2 = [plot2];
        var layout2 = {
            title: "OTUs in Subjects' Navel",
            showlegend: false,
        };

        Plotly.newPlot("bubble", data2, plot2);


    });
};

// FUNCTION #2 of 4
//Display the sample metadata card

function populateDemoInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        // console.log(data)
    })

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(s => s.id == patientID);
        var result = resultArray[0];

        var demographicInfoBox = d3.select("#sample-metadata");
        demographicInfoBox.html("");
        Object.entries(result).forEach(([key, value]) => {
            demographicInfoBox.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// FUNCTION #3 of 4
function optionChanged(patientID) {
    console.log(patientID);
    buildCharts(patientID);
    populateDemoInfo(patientID);
};

// FUNCTION #4 of 4
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then((data) => {
        var patientIDs = data.names;
        patientIDs.forEach((patientID) => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        buildCharts(patientIDs[0]);
        populateDemoInfo(patientIDs[0]);
    });
};

initDashboard();
