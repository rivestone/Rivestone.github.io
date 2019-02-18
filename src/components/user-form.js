import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, Errors, actions } from 'react-redux-form';

const required = (val) => val;
const minLength = (len) => (val) => val.length >= len;
const isChecked = (val) => val==true;
const available = (email) => email !== 'foo@gmail.com';
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class UserForm extends React.Component {
  handleSubmit(myData) {
    let userData = JSON.stringify(myData);
    let { dispatch } = this.props;

    let userPromise = fetch('...', {
     method: 'post',
     body: userData
    })
    .then((res) => res.json())
    .then((res) => {
      dispatch(actions.setSubmitted('user', true))
    });
    dispatch(actions.submit('user', userPromise));
  }

  handleSubmitFailed(user){
    console.log(user.$form, 'user')
  }

  render() {
    let { user } = this.props;
    return (
      <Form
        className="user-form"
        model="user"
        onSubmit={(user) => this.handleSubmit(user)}
        onSubmitFailed={(user) => this.handleSubmitFailed(user)}
        validators={{
           '': {
           },
           email: { required, available, validEmail },
           password: { required, minLength: minLength(4) },
           acceptAgreement: { isChecked }
         }}
       validateOn="change"
       hideNativeErrors>

        <Field
          className="user-form__field"
          model="user.email"

          validateOn="change"
          mapProps={{
            className: ({fieldValue}) => fieldValue.value.length<1
              ? ''
              : 'not-empty'
          }}>
          <input
            type="email"
           />
           <span>Your email address</span>
        </Field>
        <div className="user-form__field-wrapper">
        <Field
          className="user-form__field"
          model="user.password"
          validators={{
           required,
           minLength: minLength(4)
          }}
          validateOn="change"
          mapProps={{
            className: ({fieldValue}) => fieldValue.value.length<1
              ? ''
              : 'not-empty'
          }}>
          <input
            type="password"
          />
          <span>Придумайте пароль</span>

        </Field>
        <Errors
           className="popup-error"
           model="user.password"
           show="touched"
           messages={{
             minLength: 'Пожалуйста, введите не менее 4-х символов'
           }}
         />
        </div>
        <Field
          className="user-form__choose-currency"
          model="user.chooseCurrency">
          <div className="choose-currency__title">Валюта для ввода и вывода средств</div>
          <div className="choose-currency__panel">
            <label className="custom-radio-btn">
              <input type="radio" value="rubles"/>
              <div className="checkmark">Р</div>
            </label>
            <label className="custom-radio-btn">
              <input type="radio" value="dollar"/>
              <div className="checkmark">D</div>
            </label>
            <label className="custom-radio-btn">
              <input type="radio" value="ethereum"/>
              <div className="checkmark">E</div>
            </label>
          </div>
        </Field>

        <Field
          className="user-form__accept-agreement"
          model="user.acceptAgreement"
          validators={{
           isChecked
         }}
         validateOn="change">
          <label className="custom-checkbox">
            <input type="checkbox"/>
            <div>Я совершеннолетний, ознакомился и принимаю соглашение об оказании услуг</div>
            <span></span>
          </label>
        </Field>

        <Errors
           className="bottom-error"
           model="user.email"
           show="touched"
           messages={{
             validEmail: 'Неверный формат email',
             available: 'Этот почтовый адрес уже занят'
           }}
         />

        <Errors
           className="bottom-error"
           model="user.acceptAgreement"
           show="touched"
           messages={{
             isChecked: "Необходимо принять соглашение для продолжения"
           }}
         />

        <button className="user-form__submit" type="submit">Зарегистрироваться</button>

      </Form>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps)(UserForm);
