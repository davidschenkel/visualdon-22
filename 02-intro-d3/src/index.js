import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!



const svg = d3.select(".mon-svgcercle")
            
            svg.select("circle:nth-child(1)") // select le 1er cercle
                .attr("cx", "100")
                svg.append("text")
                .text("cercle 1")
                .attr("x", 100)
                .attr("y", 110)
                .attr("text-anchor", "middle")
                

            svg.select("circle:nth-child(2)")
                .attr("fill", "red") 
                .attr("cx", "200")
                svg.append("text")
                .text("cercle 2")
                .attr("x", 200)
                .attr("y", 210)
                .attr("text-anchor", "middle")

            svg.select("circle:nth-child(3)")
                svg.append("text")
                .text("cercle 3")
                .attr("x", 250)
                .attr("y", 310)
                .attr("text-anchor", "middle"); 


const cercle3 = svg.select("circle:nth-child(3)");

const cercle = svg.selectAll("circle")
const text = svg.selectAll("text");


cercle3.on("click", () => {

    cercle.attr("cx", 50);
    text.attr("x", 50);
    

    
    } )

const data = [20, 5, 25, 8, 15]

const mySVG = d3.select(".mon-svgcercle");
const groupe = mySVG.append("g");

// mySVG.selectAll("rect")
//   .data(data)
//   .enter()
//   .append("rect")
//   .text(d => 'x="100" y="200" width="20" height= '+ d +' fill="red"')

groupe.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr('x', function(d, i) {
    return i * 50;
  })
  .attr('y', (d) => 400-d) // pour que le rectangle parte vers le haut
  .attr('width', 20)
  .attr('height', function(d) {
    return  d;
  })
  .attr('fill', 'orange')
  