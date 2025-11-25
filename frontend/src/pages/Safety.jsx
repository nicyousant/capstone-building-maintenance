export default function Safety() {
    return (
       <>
       <h2>Safety</h2>
   
       <section>
            <div style={{width: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}><h3>Always use the appropriate personal protective equipment (PPE) for the task.</h3></div>
            <div className="safetyContainer">
              <div className="safetyCircle"><img src="hardhat.png" /></div>
           <div className="safetyCircle"><img src="high-vis-vest.png" /></div>
              <div className="safetyCircle"><img src="safety-glasses.png" /></div>
                <div className="safetyCircle"><img src="face-mask.png" /></div>
                 <div className="safetyCircle"><img src="ear-protection.png" /></div>
                   <div className="safetyCircle"><img src="safety-gloves.png" style={{height: "75px", width: "42px"}} /></div>
                   <div className="safetyCircle"><img src="work-boot.png" /></div>
                   </div>
                   </section>
       </>
    )
}