/*
Less than: <
Greater than: >
Less than or equal to: <=
Greater than or equal to: >=
Is equal to: ===
Is not equal to: !==
*/

let woodCount = 0;
let foodCount = 0;
let stoneCount = 0;
let wProductionRate = 1;
let fProductionRate = 1;
let sProductionRate = 1;
let isTripleProduction = false;
let apples = 0;
let godApples = 0;

function harvestLrg()
{
  woodCount += 100;
  document.getElementById('para1').innerHTML = woodCount;
  toggleButton();
  if (woodCount >= 200) {
    document.getElementById("butone1").disabled = "true";
  }
}

    function woodButt() {
      woodCount += wProductionRate;
      document.getElementById('para1').innerHTML = woodCount;
      toggleButton();

      if (woodCount >= 200) {
        document.getElementById("butone1").disabled = "true";
      }
    
      if (Math.ceil(Math.random() * 100) >= 99) {
        apples += 1;
        document.getElementById('para4').innerHTML = apples;
      }

      if (Math.ceil(Math.random() * 10000) >= 9990) {
        godApples +=1;
        document.getElementById('para5').innerHTML = godApples;
      }

      woodCheck();

    }

    function foodButt()
    {
      foodCount += fProductionRate;
      document.getElementById('para2').innerHTML = foodCount;
    }

    function stoneButt()
    {
      stoneCount += sProductionRate;
      document.getElementById('para3').innerHTML = stoneCount;
    }

    
    function toggleButton() 
    {
      if(woodCount >= 100) {
        document.getElementById('butone4').removeAttribute('disabled');
      }

      if (woodCount >= 200) {
        document.getElementById('butone5').removeAttribute('disabled');
      }
    }

    function tripWood()
    {
      if(isTripleProduction) return;
      isTripleProduction = true;
      wProductionRate += 2;
      document.getElementById('butone4').style.visibility = 'hidden';
      document.getElementById('para6').style.visibility = 'hidden';
      document.getElementById('reg1').innerHTML = 'efficient woodcutters'
    }

    function woodCheck()
    {
      if (woodCount >= 400) {
        document.getElementById("butone1").disabled = 'true';
      } else {
        document.getElementById("butone1").removeAttribute('disabled');
      }
    }

    function woodMax()
    {
      document.getElementById('maxw').innerHTML = '/400';
      document.getElementById('butone5').style.visibility = 'hidden';
      document.getElementById('reg2').innerHTML = 'extra wood storage'
      document.getElementById('para7').style.visibility = 'hidden';
      if (woodCount >= 400) {
        document.getElementById("butone1").disabled = 'true';
      } else {
        document.getElementById("butone1").removeAttribute('disabled');
      }
    }
