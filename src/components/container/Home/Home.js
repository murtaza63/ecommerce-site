import React, {Component} from 'react';
// import axios to call your backend
import axios from 'axios';


export default class Home extends Component{
    constructor(){
        super();

        this.state = {
            // Have a products and loading 
            // products holding all your products
            products: [],
            // loading for when loader is shown
            // set it true and when data is retrieve set to false.
            loading: true
        }
    }


    componentDidMount(){
        axios.get('/api/products').then(res =>{
           console.log('res.data products-----', res.data)
           // Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
           this.setState({products:res.data, loading:false})
            //Each .then must have a .catch to catch errors.
        }).catch(err => console.log('Read all products Error----', err))
    }
}