import * as d3 from 'd3';
import { json, svg } from 'd3';

// Recupère les datas des 2 APIS.  
Promise.all([
    json('https://jsonplaceholder.typicode.com/posts'),
    json('https://jsonplaceholder.typicode.com/users')
])
    .then(([posts, users]) => {

        ////////Création tableau utilisateurs avec leurs posts
        let tabObjet = users.map((u) => {
            let titreFiltre = posts.filter((p, i) => p.userId == u.id)
            let variable = {
                "nom_utilisateur": u.username,
                "ville": u.address.city,
                "nom_companie": u.company.name,
                "titres_posts": titreFiltre.map(posts => posts.title),

            }

            return variable;

        })
        


        ////////Calculer le nombre de posts par utilisateur
        users.forEach(user => {
            let compteur = 0

            posts.forEach(post => {
                //console.log(post.userId);
                if (post.userId == user.id) {
                    compteur++;
                }
            })

            d3.select("body")
                .append("div")
                .attr('id', `div-user${user.id}`)
            d3.select(`#div-user${user.id}`)
                .append('p')
                .text(`${user.name} a écrit ${compteur} article(s).`)



        });
        ////////Trouvez l'utilisateur avec le plus long post
        let longestPost = ''
        let longestPostId = 0
        posts.forEach(post => {
            if (longestPost.length < post.body.length) {
                longestPost = post.body
                longestPostId = post.userId
            }
        })

        let userLongestPost = users[longestPostId - 1].name

        d3.select("body")
            .append("div")
            .attr('id', 'longestPost')
        d3.select('#longestPost')
            .append('p')
            .text(`${userLongestPost} a écrit le plus long post`)







        ////////Graphique users et leurs posts

        const margin = { top: 10, right: 60, bottom: 30, left: 10 };
        const width = 1500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        d3.select("body")
            .append("div")
            .attr('id', 'graph')
        let svg = d3.select("#graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        let data = users.map((u) => {
            let postsVar = posts.filter((p, i) => p.userId == u.id)
            let variable = {
                "nom": u.username,
                "nbPosts": postsVar.map(posts => posts.title),

            }

            return variable;

        })

        
        let x = d3.scaleBand()
            .domain(data.map(function (d) { return d["nom"]; }))
            .range([1000, 0]);

        const y = d3.scaleLinear()
            .domain(data.map(function (d) { return d["nbPosts"].length; }))
            .range([height, 0])

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-2,10)")

        svg.append("g")
            .call(d3.axisLeft(y));
    

            svg.selectAll("bars")
            .data(data)
            .enter()
            .append('rect')

            .attr("x", function(d) { return x(d["nom"])+40; })
            .attr("y", function(d) { return y(d["nbPosts"].length); })
            .attr('width', 20)
            .attr('height', function(d) { return height - y(d["nbPosts"].length); })
            .attr('fill', 'blue')

    })
    .catch(([error]) => {

        console.log(error);

    })


