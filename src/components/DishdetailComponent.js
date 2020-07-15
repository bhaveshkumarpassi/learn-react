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

            const commList = commentsArray.map((comm) => {
                return (
                    <div key={comm.id}>
                        <li>{comm.comment}</li><br/>
                        <li>{comm.author} , {comm.date}</li><br/>
                    </div>
                );
            });
                return(
                        <div className="col-12 col-md-5 m-1">
                            <h4>Commnets</h4>
                            <ul className="list-unstyled">
                                {commList}
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
