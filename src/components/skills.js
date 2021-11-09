import React, {useState, useEffect, useCallback} from "react"
import Typist from 'react-typist'
//import TypistLoop from 'react-typist-loop'

const TypistLoop = (
{ interval = 1000, children },
) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [timer, setTimer] = useState();

    useEffect(() => {
        setMounted(true);
        return () => {
        setMounted(false);
        if (timer) clearTimeout(timer);
        };
    }, []);

    const showNext = useCallback(() => {
        if (!mounted) return;
        setCurrentIndex((currentIndex + 1) % React.Children.count(children));
    }, [mounted, currentIndex, children]);

    const onTypingDone = useCallback(() => {
        setTimer(setTimeout(showNext, interval));
    }, [showNext, interval]);

    return React.Children.map(
        children,
        (child, i) =>
        i === currentIndex &&
        React.cloneElement(child, { onTypingDone }),
    );
};



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
                            <Typist.Backspace count={text.length} delay={500} />
                        </Typist>)
                    }
                </TypistLoop>
        </div>
      </div>
	    
    )
}

export default Skills


