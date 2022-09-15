import { Component } from "react";

class Carosel extends Component {
    state = {
        active:0
    }

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
    };
    
    handeIndexClick = (event) => {
        console.log(this);
        this.setState({
            active: +event.target.dataset.index,
        })
    }

    render() {
        const { images } = this.props;
        const { active } = this.state;
        return (
            <div className="carousel">
            <img src={images[active]} alt="animal" />
            <div className="carousel-smaller">
              {images.map((photo, index) => (
                // eslint-disable-next-line
                <img
                 onClick={this.handeIndexClick}
                  key={photo}
                  src={photo}
                  data-index={index}
                  className={index === active ? "active" : ""}
                  alt="animal thumbnail"
                />
              ))}
            </div>
          </div> 
        );
    }

}

//console.log(Carosel.defaultProps);



export default Carosel;
