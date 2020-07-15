import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

    class DishDetail extends Component{
        constructor(props){
            super(props);
            this.state = {};
        }

        renderDish(dish){
                return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                );
        }

        renderComments(commentsArray){
                return(
                        <div className="col-12 col-md-5 m-1">
                        <h4>Commnets</h4>
                        <ul className="list-unstyled">
                        <li>{commentsArray[0].comment}</li><br/>
                        <li>{commentsArray[0].author} , {commentsArray[0].date}</li><br/>
                        <li>{commentsArray[1].comment}</li><br/>
                        <li>{commentsArray[1].author} , {commentsArray[1].date}</li><br/>
                        <li>{commentsArray[2].comment}</li><br/>
                        <li>{commentsArray[2].author} , {commentsArray[2].date}</li><br/>
                        <li>{commentsArray[3].comment}</li><br/>
                        <li>{commentsArray[3].author} , {commentsArray[3].date}</li><br/>
                        <li>{commentsArray[4].comment}</li><br/>
                        <li>{commentsArray[4].author} , {commentsArray[4].date}</li><br/>
                        </ul>
                        </div>
                );
        }

        render(){

            if(this.props.selectedDish != null){
                return(
                    <div className="row">
                        {this.renderDish(this.props.selectedDish)},
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                );
            }else{
                return (
                    <div></div>
                );
            }
        }
    }

export default DishDetail;
