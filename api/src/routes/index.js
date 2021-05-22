const { Videogame, Genre } = require('../db.js');
const fetch = require("node-fetch");
const { API_KEY } = process.env;
const { Op } = require('sequelize');
const { Router } = require('express');

const router = Router();

router.get("/videogames", async (req, res) => {

    //Primera página con filtro género
    if (req.query.filtroGenero) {

        var dbFirstPageGenre
        //Si ademas del género viene un search name, busco en la base de datos por género y name
        if (req.query.name) {
            dbFirstPageGenre = await Videogame.findAll({
                where: {
                    genre: { [Op.contains]: [req.query.filtroGenero] },
                    slug: req.query.name.toLowerCase().split(" ").join("-")
                },
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }
        //Sino, busco en la bd solo por género
        else {
            dbFirstPageGenre = await Videogame.findAll({
                where: { genre: { [Op.contains]: [req.query.filtroGenero] } },
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }
        if (!req.query.filtroAdd) {
            const firstPageGenreApi = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&genres=${req.query.filtroGenero}${req.query.name ? "&search=" + req.query.name : ""}${req.query.order ? "&ordering=" + req.query.order : ""}`)
                .then(res => res.json())
                .then((res) => {
                    if (res["detail"] == "Invalid page.") return []
                    else {
                        let games = res["results"].map(game =>
                            game = {
                                id: game.id,
                                image: game.background_image,
                                genre: game.genres.map(g => g.name),
                                name: game.name,
                                slug: game.slug,
                                rating: game.rating,
                                screenshots: game.short_screenshots,
                            });
                        return games;
                    }
                })
                .catch(err => console.log(err))

            if (dbFirstPageGenre[0]) {
                if (req.query.order === "name") dbFirstPageGenre.sort((a,b) => a.slug > b.slug && 1 || -1)
                if (req.query.order === "-rating") dbFirstPageGenre.sort((a,b) => a.rating > b.rating && -1 || 1)
                firstPageGenreApi.unshift(...dbFirstPageGenre)
            }

            res.send({
                page: "1",
                genre: req.query.filtroGenero,
                search: req.query.name,
                order: req.query.order,
                games: firstPageGenreApi
            }).status(200);
        }
        else {
            if (req.query.order) {
                if (req.query.order === "name") dbFirstPageGenre.sort((a,b) => a.slug > b.slug && 1 || -1)
                if (req.query.order === "-rating") dbFirstPageGenre.sort((a,b) => a.rating > b.rating && -1 || 1)
                res.send({
                    page: "1",
                    genre: req.query.filtroGenero,
                    search: req.query.name,
                    order: req.query.order,
                    filterAdd: req.query.filtroAdd,
                    games: dbFirstPageGenre
                }).status(200);
            }
            else {
                res.send({
                    page: "1",
                    genre: req.query.filtroGenero,
                    search: req.query.name,
                    order: req.query.order,
                    filterAdd: req.query.filtroAdd,
                    games: dbFirstPageGenre
                }).status(200);
            }
        }
    }

    //Primera página
    else {
        //Si viene un search name
        var dbFirstPage = []
        if (req.query.name) {
            dbFirstPage = await Videogame.findAll({
                where: { slug: req.query.name.toLowerCase().split(" ").join("-") },
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }
        else {
            dbFirstPage = await Videogame.findAll({
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }

        if (!req.query.filtroAdd) {
            const firstPageApi = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15${req.query.name ? "&search=" + req.query.name : ""}${req.query.order ? "&ordering=" + req.query.order : ""}`)
                .then(res => res.json())
                .then((res) => {
                    if (res["detail"] == "Invalid page.") return []
                    else {
                        let games = res["results"].map(game =>
                            game = {
                                id: game.id,
                                image: game.background_image,
                                genre: game.genres.map(g => g.name),
                                name: game.name,
                                slug: game.slug,
                                rating: game.rating,
                                screenshots: game.short_screenshots,
                            });
                        return games;
                    }
                })
                .catch(err => console.log(err))            

            if (dbFirstPage[0]) {
                if (req.query.order === "name") dbFirstPage.sort((a,b) => a.slug > b.slug && 1 || -1)
                if (req.query.order === "-rating") dbFirstPage.sort((a,b) => a.rating > b.rating && -1 || 1)
                firstPageApi.unshift(...dbFirstPage)
            }

            res.send({
                page: "1",
                genre: req.query.filtroGenero,
                search: req.query.name,
                order: req.query.order,
                games: firstPageApi
            }).status(200)
        }
        else {
            if (req.query.order) {
                if (req.query.order === "name") dbFirstPage.sort((a,b) => a.slug > b.slug && 1 || -1)
                if (req.query.order === "-rating") dbFirstPage.sort((a,b) => a.rating > b.rating && -1 || 1)
                res.send({
                    page: "1",
                    genre: req.query.filtroGenero,
                    search: req.query.name,
                    order: req.query.order,
                    filterAdd: req.query.filtroAdd,
                    games: dbFirstPage
                }).status(200);
            }
            else {
                res.send({
                    page: "1",
                    genre: req.query.filtroGenero,
                    search: req.query.name,
                    order: req.query.order,
                    filterAdd: req.query.filtroAdd,
                    games: dbFirstPage,
                }).status(200);
            }
        }
    }
});

router.get("/videogames/page/:number", async (req, res) => {

    const { number } = req.params;

    //Filtrado por género páginas siguientes
    if (req.query.filtroGenero) {
        //Si ademas del filtro género viene un search name, busco en la base de datos por el genero y name
        var dbPagesGenre
        if (req.query.name) {
            //Busco en la base de datos por el genero y nombre
            dbPagesGenre = await Videogame.findAll({
                where: {
                    genre: { [Op.contains]: [req.query.filtroGenero] },
                    slug: req.query.name.toLowerCase().split(" ").join("-")
                },
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }
        //Sino, busco en la bd solo por género
        else {
            dbPagesGenre = await Videogame.findAll({
                where: { genre: { [Op.contains]: [req.query.filtroGenero] } },
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }
        if (!req.query.filtroAdd) {
            const pagesApiGenre = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&page=${number}&genres=${req.query.filtroGenero}${req.query.name ? "&search=" + req.query.name : ""}${req.query.order ? "&ordering=" + req.query.order : ""}`)
                .then(res => res.json())
                .then((res) => {
                    if (res["detail"] == "Invalid page.") return []
                    else {
                        let games = res["results"].map(game =>
                            game = {
                                id: game.id,
                                image: game.background_image,
                                genre: game.genres.map(g => g.name),
                                name: game.name,
                                slug: game.slug,
                                rating: game.rating,
                                screenshots: game.short_screenshots,
                            });
                        return games;
                    }
                })
                .catch(err => console.log(err))

            res.send({
                page: number,
                genre: req.query.filtroGenero,
                search: req.query.name,
                order: req.query.order,
                games: pagesApiGenre,
            }).status(200)
        }
        else {
            res.send({
                page: number,
                genre: req.query.filtroGenero,
                search: req.query.name,
                order: req.query.order,
                filterAdd: req.query.filtroAdd,
                games: dbPagesGenre
            }).status(200);
        }
    }

    //Search paginas siguientes
    else {
        var dbPages
        if (req.query.name) {
            dbPages = await Videogame.findAll({
                where: { slug: req.query.name.toLowerCase().split(" ").join("-") },
                attributes: ["id", "image", "genre", "name", "slug", "rating"],
            })
        }
        if (!req.query.filtroAdd) {
            const gamesPage = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&page=${number}${req.query.name ? "&search=" + req.query.name : ""}${req.query.order ? "&ordering=" + req.query.order : ""}`)
                .then(res => res.json())
                .then((res) => {
                    if (res["detail"] == "Invalid page.") return []
                    else {
                        let games = res["results"].map(game =>
                            game = {
                                id: game.id,
                                image: game.background_image,
                                genre: game.genres.map(g => g.name),
                                name: game.name,
                                slug: game.slug,
                                rating: game.rating,
                                screenshots: game.short_screenshots,
                            });
                        return games;
                    }
                })
                .catch(err => console.log(err))

            res.send({
                page: number,
                genre: req.query.filtroGenero,
                search: req.query.name,
                order: req.query.order,
                games: gamesPage
            }).status(200)
        }
        else {
            res.send({
                page: number,
                genre: req.query.filtroGenero,
                search: req.query.name,
                order: req.query.order,
                filterAdd: req.query.filtroAdd,
                games: dbPages
            }).status(200);
        }
    }
})

//Detalles de juegos
router.get("/videogame/:slug", async (req, res) => {

    const fId = await Videogame.findOne({
        where: { slug: req.params.slug },
        attributes: ["id", "image", "genre", "name", "description", "releaseDate", "rating", "platform"]
    })

    if (fId) {
        res.send(fId).status(200);
    }
    else {
        const gId = await fetch(`https://api.rawg.io/api/games/${req.params.slug}?key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                let result;
                if (res.detail == "Not found.") return "No se encontró el juego";
                else {
                    result = {
                        id: res.id,
                        slug: res.slug,
                        image: res.background_image,
                        genre: res.genres.map(g => g.name),
                        name: res.name,
                        description: res.description,
                        releaseDate: res.released,
                        rating: res.rating,
                        platform: res.parent_platforms.map(plat => plat.platform.name)
                    }
                    return result;
                }
            })
            .catch(err => console.log(err))
        res.send(gId).status(200)
    }
})

//Screenshots del juego
router.get("/videogame/screenshots/:slug", async (req, res) => {

    const gamesSS = await fetch(`https://api.rawg.io/api/games/${req.params.slug}/screenshots?key=${API_KEY}`)
        .then(res => res.json())
        .then(res => {
            if (res.detail == "Not found.") return "No se encontró el juego";
            else {
                return res.results;
            }
        })
        .catch(err => console.log(err))
    res.send(gamesSS).status(200)

})

//Obtención de géneros
router.get("/genres", async (req, res) => {

    const g = await Genre.findAll({
        attributes: ["name", "slug"],
    })

    if (g[0]) {
        res.send(g).status(200)
    }
    else {
        const allGenres = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(res => res.json())
            .then(async (res) => {
                let genres = res["results"].map(genre => {return {name: genre.name, slug: genre.slug}});
                for (var i = 0; i < genres.length; i++) {
                    await Genre.findOrCreate({
                        where: { 
                            name: genres[i].name 
                        },
                        defaults: { 
                            name: genres[i].name, 
                            slug: genres[i].slug 
                        }
                    })
                }
                return genres;
            })
            .catch(err => console.log(err))
        res.send(allGenres).status(200)
    }
})

//Creación de juegos
router.post("/videogame", async (req, res) => {
    const { name, genre, image, description, releaseDate, rating, platform } = req.body;
    if (!name) return res.status(422).json({ error: "Falta el nombre" })
    if (!description) return res.status(422).json({ error: "Falta la descripción" })
    if (!platform[0]) return res.status(422).json({ error: "Falta la plataforma/s" })

    try {
        const createGame = await Videogame.findOrCreate({
            where: {
                name: name,
                [Op.or]: [{ name: name }, { description: description }, { platform: platform }]
            },
            defaults: {
                name,
                slug: name.toLowerCase().split(" ").join("-"),
                genre,
                image,
                description,
                releaseDate,
                rating,
                platform
            }
        })

        res.json(createGame[0])

    } catch (error) {
        console.log(error)
    }
})

//Eliminar juegos
router.delete("/videogame", async (req, res) => {
    const { id } = req.body
    await Videogame.destroy({ where: { id: id } })
    res.send("Juego eliminado").status(200)
})

//Obtención de plataformas
router.get("/platforms", async (req, res) => {
    const platforms = await fetch(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
        .then(res => res.json())
        .then((res) => {
            let platforms = res["results"].map(platforms =>
                platforms.name
            );
            return platforms;
        })
        .catch(err => console.log(err))
    res.send(platforms).status(200)
})

module.exports = router;