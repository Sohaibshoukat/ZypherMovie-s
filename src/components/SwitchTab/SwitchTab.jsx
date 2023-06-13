import React, { useState } from "react";
import "./style.scss"

const SwitchTab = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const ActiveTab=(item,index)=>{
        setLeft(index*100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(item,index)
    }

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((item, index) => (
          <span 
          className={`tabItem ${selectedTab===index&&"active"}`} 
          key={index}
          onClick={() =>{ActiveTab(item,index)}}>
            {item}
          </span>
        ))}
        <span className="movingBg" style={{left:left}}/>
      </div>
    </div>
  );
};

export default SwitchTab;
