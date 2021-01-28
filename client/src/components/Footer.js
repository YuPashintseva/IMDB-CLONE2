import React from 'react';
import  rsschool from "./assets/rs_school_js.svg";


export default class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <footer className="bg-dark text-center text-lg-start">
            <div className="container p-4">
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                  <h5 className="text-uppercase yellow-text"> The Rolling Scopes School</h5>
                  <p>
                    Бесплатный курс «JavaScript/Front-end» от сообщества The
                    Rolling Scopes -{" "}
                    <a
                      className="footer__link"
                      target="_blank"
                      href="https://rs.school/js/"
                    >
                      rs.school/js
                    </a>
                  </p>
                </div>
  
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase"></h5>
                  <div>
                    <img className="footer__image" src={rsschool}></img>
                  </div>
                </div>
  
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase mb-0 yellow-text">Developed by:</h5>
  
                  <ul className="list-unstyled">
                    <li>
                      <a className="" href="https://github.com/YuPashintseva">
                        YuPashintseva
                      </a>
                    </li>
                    <li>
                      <a className="" href="https://github.com/anatkig">
                        anatkig
                      </a>
                    </li>
                    <li>
                      <a className="" href="https://github.com/vegas-muffin">
                        vegas-muffin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div className="text-center p-3">
              {" "}
              &copy; 2021 Copyright{" "}
              <a className="text-dark" href="#">
                IMDb-clone
              </a>
            </div>
          </footer>
        )
    }
}