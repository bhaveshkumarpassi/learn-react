import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem, Button,Modal,ModalHeader,ModalBody,Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

        class CommentForm extends Component {

            constructor(props) {
                super(props);

                this.state = {
                    isModalOpen: false
                };
                this.toggleModal = this.toggleModal.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }

            toggleModal() {
                this.setState({
                  isModalOpen: !this.state.isModalOpen
            });
            }

            handleSubmit(values) {
                this.toggleModal();
                this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
            }

            render() {
                return(
                    <div>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <div className="row form-group">
                                        <Label htmlFor="rating" className="col-12">Rating</Label>
                                        <div className="col-12">
                                            <Control.select model=".rating" name="rating" className="form-control">
                                                <option>5</option>
                                                <option>4</option>
                                                <option>3</option>
                                                <option>2</option>
                                                <option>1</option>
                                            </Control.select>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <Label htmlFor="name" className="col-12">Name</Label>
                                        <div className="col-12">
                                            <Control.text model=".name" name="name" className="form-control"
                                            id="name" placeholder="Your Name" 
                                            validators={{required,minLength: minLength(3),maxLength: maxLength(15)}} />
                                            <Errors className="text-danger"
                                            show="touched"
                                            model=".name"
                                            messages={{
                                                required: "Required",
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }} />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <Label htmlFor="comment" className="col-12">Comment</Label>
                                        <div className="col-12">
                                            <Control.textarea model=".comment" name="comment" className="form-control"
                                            id="comment" rows="6" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-12">
                                            <Button type="submit" color="primary">Submit</Button>
                                        </div>
                                    </div>
                                    
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                    </div>
                );
            }
        }

        function RenderDish({dish}){
                return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform
                                    in
                                    transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card key={dish.id}>
                            <CardImg top src={ baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
                );
        }

        function RenderComments({commentsArray, postComment, dishId}){

            /*const commList = commentsArray.map((comm) => {
                return (
                    <div key={comm.id}>
                        <Fade in>
                            <li>{comm.comment}</li><br/>
                            <li>{comm.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</li><br/>
                        </Fade>
                    </div>
                );
            });*/
                return(
                        <div className="col-12 col-md-5 m-1">
                            <h4>Commnets</h4>
                            <ul className="list-unstyled" >
                                <Stagger in>
                                {commentsArray.map((comm) => {
                                    return (
                                        <Fade in>
                                            <li key={comm.id}>
                                            <p>{comm.comment}</p>
                                            <p>{comm.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</p><br />
                                            </li>
                                        </Fade>
                                        );
                                    })}
                                </Stagger>
                            </ul>
                            <CommentForm dishId={dishId} postComment={postComment} />
                        </div>
                );
        }

        const DishDetail = (props) => {
            
            if (props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">            
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (props.errMess) {
                return(
                    <div className="container">
                        <div className="row">            
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else if(props.dish != null){
                return(
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>

                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>                
                        </div>
                        <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments commentsArray={props.comments} 
                            postComment={props.postComment} dishId={props.dish.id} />
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
