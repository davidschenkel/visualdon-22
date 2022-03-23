import * as d3 from 'd3';
import { json } from 'd3';

// Recupère les datas des 2 APIS.  
Promise.all([
    json('https://jsonplaceholder.typicode.com/posts'),
    json('https://jsonplaceholder.typicode.com/users')
])
    .then(([posts, users]) => {



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

        console.log(tabObjet);

        let b = document.body
        for (let i = 0; i < tabObjet.length; i++) {
            let newP = document.createElement('p');
            newP.textContent = "Utilisateur " + (i + 1) + " possède " + tabObjet[i].titres_posts.length + " posts";
            b.append(newP)
        }

        let tabBody = posts.map(p => p.body)
        let tabBodyTrie = tabBody.reduce((a, b) => { return a.length > b.length ? a : b });
        console.log(tabBodyTrie);
        let tabBody2 = posts.filter((a, b) => a.body.length > 220)
        let userGrandBody = users.filter((a) => a.id == 2)
        let userGrandBody2 = userGrandBody.map(z => z.name)
        let newPP = document.createElement('p');
        newPP.textContent = "Plus long body = " + userGrandBody2
        b.append(newPP)







    })
    .catch(([error]) => {

        console.log(error);

    })



