import * as React from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from 'app/services/userService';
import { UserModel } from 'app/models/UserModel';
import './userList.css'
import { withRouter } from 'react-router';
interface IUserListProps{ 
    users: UserModel[]
    history:{
        push: (path) => void;
    }
}

export class UserListImpl extends React.Component<IUserListProps> {

    async componentDidMount(){
      await  getAllUsers()
    }

    renderUserList = () => {
        const { users } = this.props
        return users.map((userData, index) => {
            const userInstance = userData[1];
         return <UserDetails key={index} {...userInstance.props} />
        })
    }

    render(){
        const { users,history } = this.props;
        return <React.Fragment>
            {!users.length ? <div><img style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }} src="http://chittagongit.com//images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg" /></div>:
                 <React.Fragment>
                    <h3 style={{textAlign: "center"}} >User List</h3>
                    <div style={containerStyle}> 
                    {this.renderUserList()}
                </div>
                <div className="add-user-button" onClick={() => history.push('/add_user')} >
                   +
                </div>
                </React.Fragment>
            }
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    const users = UserModel.list();
    return {
        users
    }
}

export const UserList = withRouter(connect(mapStateToProps)(UserListImpl) as any)

const UserDetails = (props) => {
  return  <div style={{
    width: '300px',
    margin: '15px', 
    padding: '10px',
  }} className="card card-1" >
    <div className="col-md-12">
      <div>
      ID: &nbsp;  {props.id}
      </div>
      <div>
      Name: &nbsp;  {props.name}
      </div>
      <div>
      Email: &nbsp;  {props.email}
      </div>
      <div>
      Gender: &nbsp;  {props.gender}
      </div>
      <div>
      Phone: &nbsp;  {props.phone}
      </div>
      <div>
      Date Of Birth: &nbsp;  {props.dob}
      </div>
    </div>
    </div>
}

const containerStyle:React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
}