import * as d3 from 'd3';
import { json, svg, csv } from 'd3';

// Pour importer les données
import incomeString from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeString from '../data/life_expectancy_years.csv'
import populationString from '../data/population_total.csv'
import arrayTransformed from './lib/arrayTransformed.js'


const income = arrayTransformed(incomeString);
const life = arrayTransformed(lifeString);
const population = arrayTransformed(populationString);
//console.log(income);
//console.log(life);
// console.log(population);

const countries = income.map((d, i) => {
    return d.country;
})
//console.log(countries);


const income2021 = income.map((d, i) => {
    return d["2021"];
})
//console.log(income2021);



const life2021 = life.map((d, i) => {
    return d["2021"];
})
//console.log(life2021);


const polulation2021 = population.map((d, i) => {
    return d["2021"];
})
//console.log(polulation2021);

// Création tableau données 2021 par pays
let y2021 = [];
let i = 0;
countries.forEach(country => {
    country = {
        country: country,
        income: income2021[i],
        life: life2021[i],
        population: polulation2021[i]
    }
    y2021.push(country);
    i++;
});

console.log(y2021);

const margin = { top: 10, right: 40, bottom: 30, left: 30 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph')
let svg1 = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("class", "group")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")





let x = d3.scaleLinear()
    .domain([0, 130000])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])

// Add a scale for bubble size
const z = d3.scaleLinear()
    .domain([50000, 2000000000])
    .range([1, 50]);

svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

svg1.append("g")
    .call(d3.axisLeft(y));

const groupe = d3.select(".group");

groupe.selectAll("circle")
    .data(y2021)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.income); })
    .attr("cy", function (d) { return y(d.life); })
    .attr("r", function (d) { return z(d.population); })
    .style("fill", "blue")
    // .style("opacity", "0.7")
    .attr("stroke", "blue")

// Cartographie 

const margin2 = { top: 10, right: 40, bottom: 30, left: 30 };
const width2 = 800 - margin.left - margin.right;
const height2 = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'carte')
let svg2 = d3.select("#carte")
    .append("svg")
    .attr("width", width + margin2.left + margin2.right)
    .attr("height", height + margin2.top + margin2.bottom)
    .append("g").attr("class", "group2")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")

const groupe2 = d3.select(".group2");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(85)
    .center([0, 45])
    .translate([width / 2, height / 2]);

let colorScale = d3.scaleThreshold()
    .domain([60, 79, 80])
    .range(['green', 'lightblue', 'orange']);

// Load external data and boot
Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
]).then(function (loadData) {

        
        

    let topo = loadData[0]
    console.log(topo);
    
    
    

    let mouseOver = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", .5)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "red")
    }

    let mouseLeave = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", .8)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "transparent")
    }

    // Draw the map
    groupe2.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d, i) {
            const country = y2021.filter(y2021 => y2021.country == d.properties.name)
            let lifeExp = ''
            console.log(country[0]);
            
            if (country[0] === undefined) {
                lifeExp = 0;
            } else {
                lifeExp = country[0].life
            }
            return colorScale(lifeExp);
        })
        .style("stroke", "white")
        .attr("class", function (d) {
            return d.properties.name
        })
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
})