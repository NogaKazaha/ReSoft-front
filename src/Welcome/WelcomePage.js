import React from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import './WelcomePage.css'
const style = {
    themeWord: {
        color: '#777777'
    }
}

function WelcomePage() {
    return (
        <div className="welcome-main-div">
            <Helmet>
                <title>Welcome &#8739; ReSoft</title>
            </Helmet>
            <div className='welcome'>
                <div className="main-info">
                    <h1 className="about-head">What is <span style={style.themeWord}>ReSoft</span>?</h1>
                    <span className="about-span"><span style={style.themeWord}>ReSoft</span> is one of the most popular forums for UCODE students, where they can share their questions and find a team for the project.</span>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="200.000000pt" height="200.000000pt" viewBox="0 0 1024.000000 1024.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <metadata>
                        Created by potrace 1.16, written by Peter Selinger 2001-2019
                        </metadata>
                        <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M3045 9213 c-301 -27 -632 -100 -792 -173 -205 -95 -342 -228 -438
                        -425 -62 -128 -89 -227 -105 -380 -6 -60 -14 -121 -17 -135 -3 -14 -8 -520
                        -12 -1125 -7 -1222 -3 -1150 -74 -1223 -61 -64 -78 -65 -615 -70 l-482 -3 0
                        -305 0 -304 458 0 c566 0 606 -6 669 -99 47 -69 46 -50 53 -1476 7 -1449 8
                        -1484 60 -1673 71 -259 257 -485 496 -605 121 -61 363 -124 639 -168 128 -20
                        185 -22 668 -26 l527 -5 0 300 0 300 -302 5 c-328 4 -349 7 -472 65 -146 68
                        -256 182 -337 348 -94 192 -90 125 -88 1384 2 840 0 1110 -10 1160 -22 115
                        -52 222 -88 318 -33 86 -43 101 -117 176 -45 45 -111 103 -148 129 -85 61
                        -223 130 -305 154 -34 10 -63 20 -63 23 0 4 24 12 53 20 85 21 182 65 274 122
                        106 65 250 205 283 274 38 81 89 241 112 354 21 103 21 117 19 940 -2 749 -1
                        843 14 915 64 307 258 528 521 595 68 18 111 20 356 20 l278 0 0 300 0 300
                        -487 -2 c-269 -1 -506 -3 -528 -5z"/>
                        <path d="M6180 8920 l0 -300 278 0 c245 0 288 -2 356 -20 263 -67 457 -288
                        521 -595 15 -72 16 -166 14 -920 -3 -838 -3 -840 20 -942 24 -112 75 -271 112
                        -347 32 -68 157 -192 264 -262 93 -60 206 -112 293 -134 28 -8 52 -16 52 -19
                        0 -3 -34 -17 -75 -30 -161 -51 -310 -145 -441 -277 -74 -75 -84 -90 -117 -176
                        -36 -96 -66 -202 -88 -318 -10 -50 -12 -318 -10 -1160 2 -1259 6 -1192 -88
                        -1384 -82 -167 -196 -284 -346 -352 -116 -54 -140 -57 -462 -61 l-303 -5 0
                        -299 0 -299 458 0 c251 0 507 5 567 10 306 28 651 108 809 187 239 120 425
                        346 496 605 52 189 53 224 60 1673 7 1426 6 1407 53 1476 63 93 103 99 670 99
                        l457 0 0 304 0 305 -482 3 c-537 5 -554 6 -615 70 -71 73 -67 2 -74 1213 -6
                        1055 -8 1125 -39 1351 -22 161 -106 356 -203 474 -135 162 -301 260 -550 324
                        -346 90 -515 106 -1114 106 l-473 0 0 -300z"/>
                        </g>
                    </svg>
                    <div className='redirect-to'>
                        <Link to='/posts'>Make a reseach on posts</Link>
                        <Link to='/register'>Sign Up</Link>
                    </div>
                </div>
            </div>
            <div className='links-div'>
                <h1>Investigate with us the world of programming</h1>
                <span>Find out more about what you are interested in. Start working with us now.</span>
            </div>
        </div>
    );
}

export default WelcomePage;