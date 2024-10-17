import React from 'react'

export const Footer = () => {
    return (
        <div>
            <footer
                className="text-center text-lg-start text-white"
                style={{ backgroundColor: '#1c2331' }}  // Convert style string to object
            >
                <section
                    className="d-flex justify-content-between p-4"
                    style={{ backgroundColor: '#6351ce' }}  // Convert style string to object
                >
                    <div className="me-5">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href="#" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#" className="text-white me-4">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white me-4">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#" className="text-white me-4">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>

                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Wonder Walks</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                                />
                                <p className="text-wrap">
                                    WONDER WALKS is an e-commerce shoe website offering a wide range of stylish, comfortable footwear designed for everyday adventures.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Collections</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                                />
                                <p><a href="#!" className="text-white">New Arrivals</a></p>
                                <p><a href="#!" className="text-white">Men</a></p>
                                <p><a href="#!" className="text-white">Women</a></p>
                                <p><a href="#!" className="text-white">Kids</a></p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">What's In Store</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                                />
                                <p><a href="#!" className="text-white">Sneakers</a></p>
                                <p><a href="#!" className="text-white">Running shoes</a></p>
                                <p><a href="#!" className="text-white">Lifestyle shoes</a></p>
                                <p><a href="#!" className="text-white">Sandals And Slippers</a></p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                                />
                                <p><i className="fas fa-home mr-3"></i> Navi Mumbai, 400705, India</p>
                                <p><i className="fas fa-envelope mr-3"></i> wonderwalks@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-3"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    © 2024 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/"> WONDER WALKS</a>
                </div>
            </footer>
        </div>
    )
}
