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
    .domain([0, 100000])
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





