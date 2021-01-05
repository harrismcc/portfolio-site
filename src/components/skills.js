import React from "react"
//import { useStaticQuery, graphql } from "gatsby"
//import Image from "gatsby-image"
//import {useSpring, animated} from 'react-spring'
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'

const Skills = () => {

    const skills = ["Python", "TypeScript", "C/C++", "Git", "Docker", "JavaScript",
        "React", "Node.js", "Java", "Containerization", "mySQL", "Linux"]

    return(
        <div>
            <div className="skills-header">
                <p>Skills</p>
            </div>
            <div className="skills-box">
                <p style={{color: "#3E7B05"}}>harris@ubuntu</p>
                <p>:</p>
                <p style={{color: "#2A5183"}}>~</p>
                <p>$ </p>
                <TypistLoop interval={800}>
                {skills.map(text => 
                    <Typist key={text} startDelay={100}>
                        {text}
                        <Typist.Backspace count={text.length} delay={1500} />

                    </Typist>)}
            </TypistLoop>
        </div>
      </div>
	    
    )
}

export default Skills


