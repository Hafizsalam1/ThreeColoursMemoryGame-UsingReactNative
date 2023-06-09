import React from "react"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./styles";
import Modal from 'react-modal';


const GamePage = () =>{

  const [ranNumb, setRanNumb] = React.useState([]);
  const [hiScore, setHiScore] = React.useState([]);
  let highScore = [];


    let ans = [];
    const [quest, setQuest] = React.useState([]);

    const [score, setScore] = React.useState(0);

    const [disableSubmit, setDisableSubmit] = React.useState(true);

    const [disableStart, setDisableStart] = React.useState(false);

    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const [nama, setNama] = React.useState("");




    const [color, setColor] = React.useState(
     {
        button1: ["primary",1],
        button2: ["primary",1],
        button3: ["primary",1],
        button4: ["primary",1],
        button5: ["primary",1],
        button6: ["primary",1],
        button7: ["primary",1],
        button8: ["primary",1],
        button9: ["primary",1]
     }   
    );

    // React.useEffect(() => {
    //   setRanNumb([color.button1[1], color.button2[1], color.button3[1], color.button4[1], color.button5[1], color.button6[1], color.button7[1], color.button8[1], color.button9[1]]);
    // }, [color]);
   

    const onClick = (buttonId) => {
      if(color[buttonId][0] === "primary"){
          setColor(prevColors => ({
          ...prevColors,
          [buttonId]: ["danger",0]
        }));
      }

      else if(color[buttonId][0]==="success"){
        setColor(prevColors => ({
          ...prevColors,
          [buttonId]: ["primary",1]
        }));

      }


      else{

          setColor(prevColors => ({
          ...prevColors,
          [buttonId]: ["success",2]
        }));


      }

      };

      const onClickStart = () => {
        setDisableSubmit(true);
        const newRanNumb = [
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 3)
        ];
        setRanNumb(newRanNumb);
        setQuest([...newRanNumb]);
        Object.keys(color).forEach((button, index) => {
          if (newRanNumb[index] == 0) {
            setColor((prevColors) => ({
              ...prevColors,
              [button]: ["danger", 0],
            }));
          }
          else if (newRanNumb[index]==2){

            setColor((prevColors) => ({
              ...prevColors,
              [button]: ["success", 2],
            }));


          }
          else {
            setColor((prevColors) => ({
              ...prevColors,
              [button]: ["primary", 1],
            }));
          }
        });
        setDisableStart(true);
        setTimeout(resetColor, 1000);
      };



      const resetColor = () =>{
        setDisableSubmit(false)
        Object.keys(color).forEach((button) => {
          setColor((prevColors) => ({
            ...prevColors,
            [button]: ["primary",1],
          }));

        })
      }

      const onclickSubmit = () =>{
        ans = [color.button1[1], color.button2[1], color.button3[1], color.button4[1], color.button5[1], color.button6[1], color.button7[1], color.button8[1], color.button9[1]]

        console.log("ranqqlength = "+ quest.length)
        console.log("anslength = "+ ans.length)
        if(quest.length === ans.length && quest.every((value, index) => value === ans[index])){
          setScore(score+100)
          console.log("SCORE"+score)
          setTimeout(resetColor,1000);
          setTimeout(onClickStart,1000);
          
        }
        else{
        hiScore.push([nama, score]);
        setHiScore([...hiScore]);
        alert("Game over!\n Your score: " + score + "\n history: \n" + hiScore.join("\n"))
        setScore(0);
        setDisableStart(false);
        setDisableSubmit(true);
        setIsModalOpen(true)
        }

        // ans.forEach(ans => {
        //   console.log("ans"+ans)
        // });
        // quest.forEach(ran => {
        //   console.log("ques"+ran)
        // });
        
      }
      const onChangeForm = (e) =>{
        e.preventDefault();
        setNama(e.target.value)
      }

      const startModal = () =>{
        setIsModalOpen(false)
        onClickStart()
      }

      const onHistory = (e) =>{
        e.preventDefault();
        alert("History: \n" + hiScore.join("\n"))

      }



    return(
        <div>
          <Modal isOpen={isModalOpen} style={styles.modal}>
            <div style={styles.fontModal}> 
          <h1 > Welcome to three colours Memory Game</h1>
          <br/>
          <h2>Please enter your name!</h2>
          <input placeholder="name" value={nama} onChange={onChangeForm}/>
          <Button variant='primary' style={styles.modalButton} onClick={startModal} disabled={disableStart}> START </Button>
          <Button variant='primary' style={styles.modalButton} onClick={onHistory} disabled={disableStart}> HISTORY </Button>
          </div>
          </Modal>
          {"SCORE: " + score}
          <br/>
          <br/>
            <div>
            <Button variant={color.button1[0]} style={styles.Button} onClick={() => onClick("button1")}> </Button>
            <Button variant={color.button2[0]} style={styles.Button} onClick={() => onClick("button2")}> </Button>
            <Button variant={color.button3[0]} style={styles.Button} onClick={() => onClick("button3")}> </Button>
            </div>
            <div>
            <Button variant={color.button4[0]} style={styles.Button} onClick={() => onClick("button4")}> </Button>
            <Button variant={color.button5[0]} style={styles.Button} onClick={() => onClick("button5")}> </Button>
            <Button variant={color.button6[0]} style={styles.Button} onClick={() => onClick("button6")}> </Button>
            </div>
            <div>
            <Button variant={color.button7[0]} style={styles.Button} onClick={() => onClick("button7")}> </Button>
            <Button variant={color.button8[0]} style={styles.Button} onClick={() => onClick("button8")}> </Button>
            <Button variant={color.button9[0]} style={styles.Button} onClick={() => onClick("button9")}> </Button>
            </div>
            <br/>
            <Button variant='success' style={styles.Button} onClick={onclickSubmit} disabled={disableSubmit}> SUBMIT </Button>
            {/* <Button variant='primary' style={styles.Button} onClick={onClickStart} disabled={disableStart}> RETRY </Button> */}
            
        </div>
    )
}


export default GamePage