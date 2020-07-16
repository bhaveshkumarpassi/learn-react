import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


        function RenderDish(dish){
                return(
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id}>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                );
        }

        function RenderComments(commentsArray){

            const commList = commentsArray.map((comm) => {
                return (
                    <div key={comm.id}>
                        <li>{comm.comment}</li><br/>
                        <li>{comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</li><br/>
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

        const DishDetail = (props) => {

            if(props.dish != null){
                return(
                    <div className="container">
                        <div className="row">
                            {RenderDish(props.dish)},
                            {RenderComments(props.dish.comments)}
                        </div>
                    </div>
                );
            }else{
                return (
                    <div></div>
                );
            }
        }

export default DishDetail;

