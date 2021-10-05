import React, { Component } from 'react';
import { Container, Card, CardBody, CardImg, CardFooter, CardTitle, CardSubtitle, CardText, CardLink } from 'reactstrap';
import APIURL from '../../helpers/enviroment';
import './card.css'



type acceptedProps = {
    token: string
}

export interface SearchState {
   FavoriteList: Array<object>
   gameData: any
   category: any
   title: any
   thumbnail: any
   description: any
   gameURL: any
   genre: any
   platform: any

}

export default class SearchAPI extends Component<acceptedProps, SearchState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            FavoriteList: [],
            gameData: null,
            category: 'shooter',
            title: null,
            thumbnail: null,
            description: null,
            gameURL: null,
            genre: null,
            platform: null,

        }
    }

    newSearch = async () => {
        fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.state.category}`, {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		        "x-rapidapi-key": "5cc3c60202msh81d1be088e4e79bp121ec1jsna5ad5ddb3e4a"
	        }
        })
            .then(result => {return result.json()})
            .then(data => {
                console.log(data)
                this.setState({gameData: data})
                this.setState({title: data.title})
                this.setState({thumbnail: data.thumbnail})
                this.setState({gameURL: data.game_url})
                this.setState({description: data.short_description})
                this.setState({genre: data.genre})
                this.setState({platform: data.platform})
            })
            .catch(err => { 
	            console.error(err);
            });
    }

        createFavorite(){
            let gameTitle = this.state.title
            let gameInfo = this.state.description
            let gameImage = this.state.thumbnail

            fetch(`${APIURL}/favorite/`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.props.token}`
                }),
                body: JSON.stringify({
                    Favorites: {
                        gameTitle,
                        gameInfo,
                        gameImage
                    }
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.error) {
                    alert("Something happened, Not Favorited")
                } else{
                    alert("Favorited!")
                }
            })
        }

        getFavs = async () => {
            if(this.props.token) {
                try {
                    const list = fetch(`${APIURL}/favorite/myFavs`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.props.token}`
                        },
                    })
                    const res = await (await list).json()
                    this.setState({ FavoriteList: res })
                } catch (err) {
                    console.log(err)
                }
            }
            
        }
    render(){
        return(
            <div>
                <h3>Click to search for Shooter games! More Categories coming soon!!</h3>
                <button 
                className='bg-green-500 hover:bg-green-400 mb-2 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded mx-4'
                onClick={()=> {
                    this.newSearch()
                }}>Search</button>
                <button 
                className='bg-green-500 hover:bg-green-400 mb-2 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded mx-4'
                onClick={() => {
                    this.getFavs()
                }}>Favorites List</button>
                <div className='grid gap-4 grid-cols-4'>
                    {this.state.gameData ? this.state.gameData.map((data: any, index: any) => {
                        return <Container>
                            <Card id="allCards">
                                <CardImg id="cardImg" src={data.thumbnail} alt='game cover'/>
                                <CardBody>
                                    <CardTitle id="title" tag="h4">{data.title}</CardTitle>
                                    <CardSubtitle id="genre" tag="h6">{data.genre}</CardSubtitle>
                                    <CardSubtitle id="platform" tag="h6">{data.platform}</CardSubtitle>
                                    <CardText id="description">{data.short_description}</CardText>
                                    <CardLink id="gameURL" href={data.game_url}>Link to Game</CardLink>
                                </CardBody>
                                <CardFooter>
                                    <button 
                                    id='cardBtn'
                                    className='bg-indigo-500 hover:bg-yellow-400 border-b-4 border-indigo-700 hover:border-yellow-500 text-white text-center py-2 px-4 rounded mx-4'
                                    onClick={()=> {
                                        this.createFavorite()
                                    }}>Favorite</button>
                                </CardFooter>
                            </Card>
                        </Container>
                    }) : <></>}
                </div>
            </div>
        )
    }


}
