import * as React from 'react';
import { submitUserForm, getAllUsers } from '../../services/userService';
import { withRouter } from 'react-router';
import './userForm.css'

export interface IUserFromProps {
    history:{
        push: (path) => void;
    }
}


export interface IUserFromState {
    firstName?: string;
    lastName?: string
    email?: string
    gender?: string
    isSccess?: boolean;
}


export class UserFormImpl extends React.Component<IUserFromProps, IUserFromState>{

    state = {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        isSccess: false,
    }

    
    async componentDidMount(){
        await getAllUsers()
      }

    handleInputChange = (event) => {
        const { name: inputName, value} = event.target; 
        this.setState({
            [inputName]: value
        })
    }

    handleSubmit = async (event) => { 
        event.preventDefault();
        try {
            await submitUserForm(this.state);
            this.setState({
                isSccess: true
            })
            setTimeout(() => {
                this.props.history.push('/users')
            }, 2000);
        } catch (error) {
            throw error;
        }
    }

    render(){
        const {
            firstName,
            lastName,
            email,
            gender,
            isSccess
        } = this.state;
        return <main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%'
           
        }} >
                <form style={{
                     height: '400px',
                     boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                     maxWidth:'300px',
                     padding:'30px',
                     margin:'auto',
                }} onSubmit={this.handleSubmit}>
                <div onClick={() => this.props.history.push('/users')} > {'<- Back'} </div>
                <div style={{textAlign:'center', fontSize: '20px' }} >User Form</div>
                {isSccess && <div  style={{textAlign:'center', fontSize: '16px', color:'green' }} >Form Submitted Successfully..!!</div>}
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input required onChange={this.handleInputChange} name="firstName" value={firstName} type="text" className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input required onChange={this.handleInputChange} value={lastName} name="lastName" type="text" className="form-control" id="lastName" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Eamil:</label>
                    <input  required onChange={this.handleInputChange} value={email} name="email" type="email" className="form-control" id="email" />
                </div>
                <div className="radio">
                    <label>
                        <input required onChange={this.handleInputChange} type="radio" name="gender" value="male" checked={gender === 'male'} />Male</label>
                    </div>
                    <div className="radio">
                    <label><input required onChange={this.handleInputChange} type="radio" name="gender" value="female"  checked={gender === 'female'}  />Female</label>
                </div>
                <button type="submit" className="submit-button">Submit</button>
                </form>        
            </main>
    }
}

export const UserForm = withRouter(UserFormImpl as any)