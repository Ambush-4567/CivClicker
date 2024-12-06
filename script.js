let gS = {
    woodCount: 0, foodCount: 0, stoneCount: 0, metalCount: 0, leatherCount: 0, oreCount: 0, skinCount: 0, herbCount: 0,
    b4: false, b5: false, b6: false, b7: false, b8: false, b9: false, b10: false, b11: false, b12: false, b13: false,
    b14: false, b15: false, b16: false, b17: false, b18: false, b19: false, b20: false,
    wProduce: 1, fProduce: 1, sProduce: 1,
    woodCutters: 0, farmers: 0, miners: 0, blacksmiths: 0, tanners: 0,
    woodCapAm: 200, foodCapAm: 200, stoneCapAm: 200,
    apples: 0, gapples: 0,
    totalPop: 0, idleCitizens: 0, popMax: 10,
    farmRate: 1.4, woodRate: 0.5, mineRate: 0.25, oreRate: 0, skinRate: 0, metalRate: 0.5, leatherRate: 0.5,
    starving: false,
    foodRatio: 0, woodRatio: 0, stoneRatio: 0, oreRatio: 0, skinsRatio: 0, metalRatio: 0, leatherRatio: 0,
    barnStrg: 200, houseStrg: 10,
    tents: 0, wHuts: 0, cottages: 0, houses: 0, mansions: 0, barns: 0, woodStorage: 0, stoneStockpiles: 0, mills: 0, graveyards: 0,
    landUsed: 0, landCap: 1000,
};
//block for global variables, uneccesary to put in localStorage.
let userNum = 0;
let stats = false;
let personCost = 20 + Math.floor(gS.totalPop / 50);
let state = 1;
let hunger = 0;
const goldCheck = () => {if(gS.b9 == true) {
    document.getElementById('gapHid').style.visibility = 'visible';
    document.getElementById("gapHid").style.height = "auto"; }
else {document.getElementById('gapHid').style.visibility = 'hidden'; } };
//block for mansonry uograde enabling upgrades.
let masCheck = () => {if(gS.b10 == true) {
    document.getElementById('inner2').style.display = 'block'; }
    else {document.getElementById('inner2').style.display = 'none'; } };
//block for construction upgrade enabling upgrades.
let constCheck = () => {if(gS.b18 == true) {
    document.getElementById('inner3').style.display = 'block'; }
    else {document.getElementById('inner3').style.display = 'none'; } };

function startUp() 
{
   if (localStorage.getItem('gS')) {
        gS = JSON.parse(localStorage.getItem('gS')); }
    let timer = setInterval(checkUpgrade, 100);
    let timer2 = setInterval(resourceGet, 1000); 
    document.getElementById('logHide').style.display = 'none';
    importData(); sect1(); 
    butDisable(); allChecks(); goldCheck(); masCheck(); constCheck(); 
}

function resourceGet()
{
    let randoNum = Math.floor(Math.random() * 20);

    if(gS.woodCount < gS.woodCapAm) {
        gS.woodCount += gS.woodRate * gS.woodCutters;
    }

    if(gS.foodCount < gS.foodCapAm) {
        gS.foodCount += (gS.farmRate * gS.farmers) - gS.totalPop;
        if(gS.b12 == true && randoNum <= 2 && gS.foodCount < gS.foodCapAm && gS.farmers >= 1) {
            gS.skinCount += Math.floor(1 + (gS.foodRatio / 3));
        }
    }

    if(gS.stoneCount < gS.stoneCapAm) {
        gS.stoneCount += gS.mineRate * gS.miners;
    }
// tanners make 0.5 leather per worker.
    if(gS.tanners >= 1) {
        gS.leatherCount += gS.leatherRate * gS.tanners;
    }

//block for starving

if (gS.foodCount >= 1) {
    gS.starving = false;
} else if (gS.foodCount <= 0 && gS.foodRatio < 0.0) {
    gS.starving = true;
    gS.foodCount = 0;
}
allChecks(); saveGame();
//block for dying population. note the hunger variable ensures 2-3 seconds have passed first.
if(gS.starving == false) {
    hunger = 0;
    return;
} else if(gS.starving == true && hunger == 2) {
       if (gS.idleCitizens >= 1) {
        let icRate = Math.ceil(gS.idleCitizens / 20);
        gS.idleCitizens -= icRate; gS.totalPop -= icRate;
} else if (gS.woodCutters >= 1) {
        let wcRate = Math.ceil(gS.woodCutters / 20);
        gS.woodCutters -= wcRate; gS.totalPop -= wcRate;
} else if (gS.farmers >= 1) {
        let fRate = Math.ceil(gS.farmers / 20);
        gS.farmers -= fRate; gS.totalPop -= fRate;
} else if (gS.miners >= 1) {
        let mRate = Math.ceil(gS.miners / 20);
        gS.miners -= mRate; gS.totalPop -= mRate;
} else if (gS.blacksmiths >= 1) {
        let bsRate = Math.ceil(gS.blacksmiths / 20);
        gS.blacksmiths -= bsRate; gS.totalPop -= bsRate;
} else if (gS.tanners >= 1) {
        let tRate = Math.ceil(gS.tanners / 20);
        gS.tanners -= tRate; gS.totalPop -= tRate;
} 
} else if(gS.starving == true && hunger <= 1) {
 if (hunger == 0) {
    hunger = 1;
} else if (hunger == 1) {
    hunger = 2;
} else { 
    gS.starving = false;
    hunger = 0; 
} }
    allChecks(); saveGame();
}

function sect1()
{
    document.getElementById('box2').style.display = 'none';
    document.getElementById('box3').style.display = 'none';
    document.getElementById('box4').style.display = 'none';
    document.getElementById('box1').style.display = 'block';
    document.getElementById('bar1').style.backgroundColor = '#fff';
    document.getElementById('bar2').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar3').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar4').style.backgroundColor = 'lightslategrey';
}

function sect2()
{
    document.getElementById('box1').style.display = 'none';
    document.getElementById('box3').style.display = 'none';
    document.getElementById('box4').style.display = 'none';
    document.getElementById('box2').style.display = 'block';
    document.getElementById('bar2').style.backgroundColor = '#fff';
    document.getElementById('bar1').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar3').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar4').style.backgroundColor = 'lightslategrey';
}

function sect3()
{
    document.getElementById('box1').style.display = 'none';
    document.getElementById('box2').style.display = 'none';
    document.getElementById('box4').style.display = 'none';
    document.getElementById('box3').style.display = 'block';
    document.getElementById('bar3').style.backgroundColor = '#fff';
    document.getElementById('bar1').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar2').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar4').style.backgroundColor = 'lightslategrey';
}

function sect4()
{
    document.getElementById('box1').style.display = 'none';
    document.getElementById('box2').style.display = 'none';
    document.getElementById('box3').style.display = 'none';
    document.getElementById('box4').style.display = 'block';
    document.getElementById('bar4').style.backgroundColor = '#fff';
    document.getElementById('bar1').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar2').style.backgroundColor = 'lightslategrey';
    document.getElementById('bar3').style.backgroundColor = 'lightslategrey';
}

function exportSave()
{
    const gameData = JSON.parse(localStorage.getItem('gS'));
    const jsonData2 = JSON.stringify(gameData);

    const dataURL = window.URL.createObjectURL(new Blob([jsonData2], {type: 'text/json'}));

    const link = document.createElement('a');
    link.href = dataURL;
    link.setAttribute('download', 'gameData2.json');
    link.click();   
}

function importData() 
{
    const importFileInput = document.getElementById('importFile');

    importFileInput.addEventListener('change', (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const importedData = JSON.parse(e.target.result);
                gS = { ...gS, ...importedData }; // Merge importedData into gS
saveGame(); // Save updated gS to localStorage
};

            reader.readAsText(file);
        }
    });
}

function checkUpgrade()
{
    //block for upgrade availability
    if(gS.woodCount >= 100) {
        document.getElementById('butt4').removeAttribute('disabled');
    } else if(gS.woodCount <= 99) {
        document.getElementById('butt4').disabled = true;
    }
     if(gS.woodCount >= 200) {
        document.getElementById('butt5').removeAttribute('disabled');
    } else if(gS.woodCount <= 199) {
        document.getElementById('butt5').disabled = true;
    }
     
     if(gS.foodCount >= 200) {
        document.getElementById('butt6').removeAttribute('disabled');
    } else if(gS.foodCount <= 199) {
        document.getElementById('butt6').disabled = true;
    }

     if(gS.stoneCount >= 200) {
        document.getElementById('butt7').removeAttribute('disabled');
    } else if(gS.stoneCount <= 199) {
        document.getElementById('butt7').disabled = true;
    }

     if(gS.woodCount >= 100 && gS.foodCount >= 50 && gS.stoneCount >= 50) {
        document.getElementById('butt8').removeAttribute('disabled');
    } else if (gS.woodCount <= 99 || gS.foodCount <= 49 || gS.stoneCount <= 49) {
        document.getElementById('butt8').disabled = true;
    }

     if(gS.woodCount >= 200 && gS.foodCount >= 200 && gS.stoneCount >= 200) {
        document.getElementById('butt9').removeAttribute('disabled');
    } else if (gS.woodCount <= 199 || gS.foodCount <= 199 || gS.stoneCount <= 199) {
        document.getElementById('butt9').disabled = true;
    }

     if(gS.woodCount >= 400 && gS.foodCount >= 400 && gS.stoneCount >= 400 && gS.apples >= 25 && gS.gapples >= 3) {
        document.getElementById('butt10').removeAttribute('disabled');
    } else if (gS.woodCount <= 399 || gS.foodCount <= 399 || gS.stoneCount <= 399 || gS.apples <= 24 || gS.gapples <= 2) {
        document.getElementById('butt10').disabled = true;
    }

    if(gS.foodCount >= 400 && gS.apples >= 20) {
        document.getElementById('butt11').removeAttribute('disabled'); }
    else if(gS.foodCount <= 399 || gS.apples <= 19) {
        document.getElementById('butt11').disabled = true;
    }


    
    //strg caps.
    
    if(gS.foodCount >= gS.foodCapAm) {
        gS.foodCount = gS.foodCapAm;
        document.getElementById('butt2').disabled = true;
        allChecks();
    } else {document.getElementById('butt2').removeAttribute('disabled'); }

    if(gS.stoneCount >= gS.stoneCapAm) {
        gS.stoneCount = gS.stoneCapAm;
        document.getElementById('butt3').disabled = true;
        allChecks();
    } else {document.getElementById('butt3').removeAttribute('disabled'); }

    if(gS.woodCount >= gS.woodCapAm) {
        gS.woodCount = gS.woodCapAm;
        document.getElementById('butt1').disabled = true;
        allChecks(); }
     else {document.getElementById('butt1').removeAttribute('disabled'); 
 }
}

function saveGame()
{
    localStorage.setItem('gS', JSON.stringify(gS));
}

function storgClear()
{
   if (confirm("Are you sure you want to delete all data?")) {
        localStorage.clear();
        gS.woodCount = 0;
        gS.foodCount = 0;
        gS.stoneCount = 0;
        gS.metalCount = 0;
        gS.leatherCount = 0;
        gS.oreCount = 0;
        gS.skinCount = 0;
        gS.herbCount = 0;
        gS.b4 = false;
        gS.b5 = false;
        gS.b6 = false;
        gS.b7 = false;
        gS.b8 = false;
        gS.b9 = false;
        gS.b10 = false;
        gS.b11 = false;
        gS.b12 = false;
        gS.b13 = false;
        gS.b14 = false;
        gS.b15 = false;
        gS.b16 = false;
        gS.b17 = false;
        gS.b18 = false;
        gS.b19 = false;
        gS.b20 = false;
        gS.wProduce = 1;
        gS.fProduce = 1;
        gS.sProduce = 1;
        gS.woodCutters = 0;
        gS.farmers = 0;
        gS.miners = 0;
        gS.blacksmiths = 0;
        gS.tanners = 0;
        gS.woodCapAm = 200;
        gS.foodCapAm = 200;
        gS.stoneCapAm = 200;
        gS.apples = 0;
        gS.gapples = 0;
        gS.totalPop = 0;
        gS.idleCitizens = 0; 
        gS.popMax = 10;
        gS.starving = false;    
        gS.foodRatio = 0;  
        gS.woodRatio = 0;  
        gS.stoneRatio = 0;  
        gS.farmRate = 1.4;
        gS.woodRate = 0.5;
        gS.mineRate = 0.25;
        gS.tents = 0; 
        gS.wHuts = 0;
        gS.cottages = 0;
        gS.houses = 0;
        gS.mansions= 0; 
        gS.barns = 0;
        gS.woodStorage = 0;
        gS.stoneStockpiles = 0;
        gS.mills = 0;
        gS.graveyards = 0;
        gS.landUsed = 0;
        gS.landCap = 1000;
        location.reload();
      } 
}

function appCheck()
{
    if (Math.ceil(Math.random() * 10) == 1) {
        gS.apples += 1; document.getElementById('appletxt').innerHTML = gS.apples; }

      if (Math.ceil(Math.random() * 100) == 1 && gS.b9 == true) {
        gS.gapples += 1; document.getElementById('gappletxt').innerHTML = gS.gapples; }
}

function ratioCheck()
{
    gS.woodRatio = (gS.woodRate * gS.woodCutters).toFixed(1);
    gS.foodRatio = (gS.farmRate * gS.farmers - gS.totalPop).toFixed(1);
    gS.stoneRatio = (gS.mineRate * gS.miners).toFixed(1);
    gS.oreRatio = (gS.oreRate - gS.metalRate).toFixed(1);
    gS.skinsRatio = (gS.skinRate - gS.leatherRate).toFixed(1);
    gS.metalRatio = (gS.metalRate).toFixed(1);
    gS.leatherRatio = (gS.leatherRate).toFixed(1);

    if(gS.woodRatio >= 0.1) {
        document.getElementById('wRatio').style.color = '#4CBB17';
        document.getElementById('minus').innerHTML = '+';
    } else {
        document.getElementById('wRatio').style.color = 'grey';
        document.getElementById('minus').innerHTML = '';
    }

    if(gS.stoneRatio >= 0.1) {
        document.getElementById('sRatio').style.color = '#4CBB17';
        document.getElementById('minus3').innerHTML = '+';
    } else {
        document.getElementById('sRatio').style.color = 'grey';
        document.getElementById('minus3').innerHTML = '';
    }

    if(gS.foodRatio >= 0.1) {
        document.getElementById('fRatio').style.color = '#4CBB17';
        document.getElementById('minus2').innerHTML = '+';
    } else if(gS.foodRatio == 0.0) {
        document.getElementById('fRatio').style.color = 'grey';
        document.getElementById('minus2').innerHTML = ''; }
    else { 
        document.getElementById('fRatio').style.color = 'red';
        document.getElementById('minus2').innerHTML = ''; }

    document.getElementById('wRatio').innerHTML = gS.woodRatio;
    document.getElementById('fRatio').innerHTML = gS.foodRatio;
    document.getElementById('sRatio').innerHTML = gS.stoneRatio;
}

function allChecks() 
{
    personCost = 20 + Math.floor(gS.totalPop / 50);
    document.getElementById('count').innerHTML = gS.totalPop;
    document.getElementById('count1').innerHTML = gS.idleCitizens;
    document.getElementById('count2').innerHTML = gS.woodCutters;
    document.getElementById('count3').innerHTML = gS.farmers;
    document.getElementById('count4').innerHTML = gS.miners;
    document.getElementById('count5').innerHTML = gS.blacksmiths;
    document.getElementById('count6').innerHTML = gS.tanners;
    document.getElementById('para1').innerHTML = Math.floor(gS.woodCount);
    document.getElementById('para2').innerHTML = Math.floor(gS.foodCount);
    document.getElementById('para3').innerHTML = Math.floor(gS.stoneCount);
    document.getElementById('appletxt').innerHTML = gS.apples;
    document.getElementById('gappletxt').innerHTML = gS.gapples;
    document.getElementById('update1').innerHTML = gS.woodCapAm;
    document.getElementById('update2').innerHTML = gS.foodCapAm;
    document.getElementById('update3').innerHTML = gS.stoneCapAm;
    document.getElementById('update4').innerHTML = personCost;
    document.getElementById('skins').innerHTML = gS.skinCount;
    document.getElementById('ore').innerHTML = gS.oreCount;
    document.getElementById('herbs').innerHTML = gS.herbCount;
    document.getElementById('leather').innerHTML = gS.leatherCount;
    document.getElementById('people').innerHTML = gS.totalPop;
    document.getElementById('popMax').innerHTML = gS.popMax;
    document.getElementById('tentNum').innerHTML = gS.tents;
    document.getElementById('wHutNum').innerHTML = gS.wHuts;
    document.getElementById('cottageNum').innerHTML = gS.cottages;
    document.getElementById('houseNum').innerHTML = gS.houses;
    document.getElementById('mansionsNum').innerHTML = gS.mansions;
    document.getElementById('barnNum').innerHTML = gS.barns;
    document.getElementById('woodSNum').innerHTML = gS.woodStorage;
    document.getElementById('stoneSNum').innerHTML = gS.stoneStockpiles;
    document.getElementById('graveNum').innerHTML = gS.graveyards;
    document.getElementById('millNum').innerHTML = gS.mills;
    document.getElementById('landUsed').innerHTML = gS.landUsed;
    ratioCheck();
}

function woodGet()
{
    let chance1 = Math.floor(Math.random() * 10);
    gS.woodCount += gS.wProduce;
    if(chance1 >= 9) {
        gS.herbCount += 2;
    }
    allChecks(); appCheck(); saveGame();
}

function foodGet()
{
    let chance2 = Math.floor(Math.random() * 10);
    gS.foodCount += gS.fProduce;
    if(chance2 >= 8) {
        gS.skinCount += 1;
    }
    allChecks(); saveGame();
}

function stoneGet()
{
    let chance3 = Math.floor(Math.random() * 10);
    gS.stoneCount += gS.sProduce;
    if(chance3 <= 3) {
        gS.oreCount += 1;
    }
    allChecks(); saveGame();
}

function woodUp()
{
    gS.b4 = true;
    gS.woodCount -= 100;
    gS.wProduce += 2;
    allChecks(); saveGame(); butDisable();
}

function woodMax()
{
    gS.b5 = true;
    gS.woodCapAm += 200;
    gS.woodCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function foodMax()
{
    gS.b6 = true;
    gS.foodCapAm += 200;
    gS.foodCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function stoneMax()
{
    gS.b7 = true;
    gS.stoneCapAm += 200;
    gS.stoneCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function foodStoneUp()
{
    gS.b8 = true;
    gS.fProduce += 2;
    gS.sProduce += 2;
    gS.woodCount -= 100; gS.stoneCount -= 50; gS.foodCount -=50;
    allChecks(); saveGame(); butDisable();
}

function resDump()
{
    gS.woodCount = 0; gS.foodCount = 0; gS.stoneCount = 0;
    allChecks(); saveGame();
}

function gapUnlock()
{
    gS.b9 = true;
    gS.woodCount -= 200; gS.foodCount -= 200; gS.stoneCount -= 200;
    goldCheck(); allChecks(); saveGame(); butDisable();
}

function masonClk()
{
    gS.b10 = true;
    gS.woodCount -= 400; gS.foodCount -= 400; gS.stoneCount -= 400; gS.apples -= 25;
    allChecks(); saveGame(); butDisable(); masCheck();
}

function sicklesUp()
{
    gS.b11 = true;
    gS.foodCount -= 400; gS.apples -= 20;
    gS.farmRate += 0.4;
    allChecks(); saveGame(); butDisable();
}

function skinGet()
{
    gS.b12 = true;
    gS.skinCount -= 20; 
    allChecks(); saveGame(); butDisable();
}

function herbGet()
{
    gS.b13 = true;
    gS.herbCount -= 20;
    allChecks(); saveGame(); butDisable();
}

function oreGet()
{
    gS.b14 = true;
    gS.oreCount -= 20;
    allChecks(); saveGame(); butDisable();
}

function DomesticUp()
{
    gS.b15 = true;
    gS.farmRate += 0.8;
    allChecks(); saveGame(); butDisable();
}

function granUp()
{
    gS.b16 = true;
    gS.barnStrg *= 2;
    allChecks(); saveGame(); butDisable();
}

function millsOn()
{
    gS.b17 = true;
    allChecks(); saveGame(); butDisable();
}

function constructClk()
{
    gS.b18 = true;
    allChecks(); saveGame(); butDisable(); constCheck();
}

function mills1()
{
    gS.mills += 1;
    allChecks(); saveGame(); butDisable(); 
}

function butDisable()
{
    if(gS.b4 == true) {
            document.getElementById('wrap1').style.display = 'none'; } 
    if(gS.b5 == true) {
            document.getElementById('wrap2').style.display = 'none'; }
    if(gS.b6 == true) {
            document.getElementById('wrap3').style.display = 'none'; }
    if(gS.b7 == true) {
            document.getElementById('wrap4').style.display = 'none'; }
    if(gS.b8 == true) {
            document.getElementById('wrap5').style.display = 'none'; }
    if(gS.b9 == true) {
            document.getElementById('wrap6').style.display = 'none'; }
    if(gS.b10 == true) {
            document.getElementById('wrap7').style.display = 'none'; }
    if(gS.b11 == true) {
            document.getElementById('wrap8').style.display = 'none'; }
    if(gS.b12 == true) {
            document.getElementById('wrap9').style.display = 'none'; }
    if(gS.b13 == true) {
            document.getElementById('wrap10').style.display = 'none'; }
    if(gS.b14 == true) {
            document.getElementById('wrap11').style.display = 'none'; }
    if(gS.b15 == true) {
            document.getElementById('wrap12').style.display = 'none'; }
    if(gS.b16 == true) {
            document.getElementById('wrap13').style.display = 'none'; }
    if(gS.b17 == true) {
            document.getElementById('wrap14').style.display = 'none'; }
    if(gS.b18 == true) {
            document.getElementById('wrap15').style.display = 'none'; }
}

function userNumPop()
{
    //checks for population limit
    if(gS.totalPop < gS.popMax) {
    if(gS.foodCount >= personCost * userNum) {
        gS.totalPop += userNum;
        gS.idleCitizens += userNum;
        gS.foodCount -= personCost * userNum;
        allChecks();  saveGame(); } }
}
function addPop()
{
    userNum = 1;
    userNumPop();
}
function popAdd10()
{
    userNum = 10;
    userNumPop();
}
function popAdd100()
{
    userNum = 1;
    userNumPop();
}
function popAddMax()
{
   let spaceLeft = gS.popMax - gS.totalPop;
   const maxIncrease = Math.floor(gS.foodCount / personCost);
   userNum = maxIncrease;
   if(userNum > spaceLeft) {
    userNum = spaceLeft;
   }
   userNumPop();
}

function userNumWood()
{
    if(gS.idleCitizens >= userNum) {
        gS.idleCitizens -= userNum;
        gS.woodCutters += userNum;
        allChecks();  saveGame(); }
}
function autoWood()
{
    userNum = 1;
    userNumWood();
}
function autoW10()
{
    userNum = 10;
    userNumWood();
}
function autoW100()
{
   
    userNum = 100;
    userNumWood();
}
function autoWMax()
{
    userNum = gS.idleCitizens;
    userNumWood();
}
function woodNeg1()
{ 
    if(gS.woodCutters > 0) {
    userNum = -1;
    userNumWood(); }
}
function woodNeg10()
{
    if(gS.woodCutters > 0) {
        userNum = -10;
        userNumWood(); }
}
function woodNeg100()
{
    if(gS.woodCutters > 0) {
        userNum = -100;
        userNumWood(); }
}
function woodNegMax()
{
    if(gS.woodCutters > 0) {
        userNum = gS.woodCutters * -1;
        userNumWood();
    }
}

function userNumFood()
{
    if(gS.idleCitizens >= userNum) {
        gS.idleCitizens -= userNum;
        gS.farmers += userNum;
        allChecks();  saveGame(); }
}
function autoFood()
{
    userNum = 1;
    userNumFood();
}
function autoF10()
{
    userNum = 10;
    userNumFood();
}
function autoF100()
{
   
    userNum = 100;
    userNumFood();
}
function autoFMax()
{
    userNum = gS.idleCitizens;
    userNumFood();
}
function foodNeg1()
{ 
    if(gS.farmers > 0) {
    userNum = -1;
    userNumFood(); }
}
function foodNeg10()
{
    if(gS.farmers > 0) {
        userNum = -10;
        userNumFood(); }
}
function foodNeg100()
{
    if(gS.farmers > 0) {
        userNum = -100;
        userNumFood(); }
}
function foodNegMax()
{
    if(gS.farmers > 0) {
        userNum = gS.farmers * -1;
        userNumFood();
    }
}

function userNumStone()
{
    if(gS.idleCitizens >= userNum) {
        gS.idleCitizens -= userNum;
        gS.miners += userNum;
        allChecks();  saveGame(); }
}
function autoStone()
{
    userNum = 1;
    userNumStone();
}
function autoS10()
{
    userNum = 10;
    userNumStone();
}
function autoS100()
{
   
    userNum = 100;
    userNumStone();
}
function autoSMax()
{
    userNum = gS.idleCitizens;
    userNumStone();
}
function stoneNeg1()
{ 
    if(gS.miners > 0) {
    userNum = -1;
    userNumStone(); }
}
function stoneNeg10()
{
    if(gS.miners > 0) {
        userNum = -10;
        userNumStone(); }
}
function stoneNeg100()
{
    if(gS.miners > 0) {
        userNum = -100;
        userNumStone(); }
}
function stoneNegMax()
{
    if(gS.miners > 0) {
        userNum = gS.miners * -1;
        userNumStone(); }
}

function userNumMetal()
{
    if(gS.idleCitizens >= userNum) {
        gS.idleCitizens -= userNum;
        gS.blacksmiths += userNum;
        allChecks();  saveGame(); }
}
function autoMetal()
{
    userNum = 1;
    userNumMetal();
}
function autoM10()
{
    userNum = 10;
    userNumMetal();
}
function autoM100()
{
    userNum = 100;
    userNumMetal();
}
function autoMMax()
{
    userNum = gS.idleCitizens;
    userNumMetal();
}
function metalNeg1()
{ 
    if(gS.blacksmiths > 0) {
    userNum = -1;
    userNumMetal(); }
}
function metalNeg10()
{
    if(gS.blacksmiths > 0) {
        userNum = -10;
        userNumMetal(); }
}
function metalNeg100()
{
    if(gS.blacksmiths > 0) {
        userNum = -100;
        userNumMetal(); }
}
function metalNegMax()
{
    if(gS.blacksmiths > 0) {
        userNum = gS.blacksmiths * -1;
        userNumMetal(); }
}

function userNumLeather()
{
    if(gS.idleCitizens >= userNum) {
        gS.idleCitizens -= userNum;
        gS.tanners += userNum;
        allChecks();  saveGame(); }
}
function autoLeather()
{
    userNum = 1;
    userNumLeather();
}
function autoL10()
{
    userNum = 10;
    userNumLeather();
}
function autoL100()
{
    userNum = 100;
    userNumLeather();
}
function autoLMax()
{
    userNum = gS.idleCitizens;
    userNumLeather();
}
function leatherNeg1()
{ 
    if(gS.tanners > 0) {
    userNum = -1;
    userNumLeather(); }
}
function leatherNeg10()
{
    if(gS.tanners > 0) {
        userNum = -10;
        userNumLeather(); }
}
function leatherNeg100()
{
    if(gS.tanners > 0) {
        userNum = -100;
        userNumLeather(); }
}
function leatherNegMax()
{
    if(gS.tanners > 0) {
        userNum = gS.tanners * -1;
        userNumLeather(); }
}

function caikPlug()
{
    window.open("https://ambush-4567.github.io/Caikwars-Latest/", "_blank");
}

function logPress()
{
    if(stats == false) {
        stats = true;
        document.getElementById('logHide').style.display = 'block';
    } else if(stats == true) {
        stats = false;
        document.getElementById('logHide').style.display = 'none';
    }
}

//function for land space calculation
function landCheck()
{
    if (gS.landUsed + userNum <= gS.landCap)  {
        return true;
    } else {
        return false;
    }
}
// actually adds used land to calc
function landAdd()
{
    gS.landUsed += userNum;       
}

function tentGet()
{
    if(gS.woodCount >= (2 * userNum) && gS.skinCount >= (2 * userNum)) {
        gS.tents += userNum; gS.popMax += userNum;
        gS.skinCount -= userNum * 2; gS.woodCount -= userNum * 2;
        landAdd(); allChecks(); }
}
function tent1()
{  userNum = 1; if(landCheck()){tentGet();}  }
function tent10()
{  userNum = 10; if(landCheck()) {tentGet();} }
function tent100()
{  userNum = 100; if(landCheck()) {tentGet();} }
function tent1k()
{  userNum = 1000; if(landCheck()) {tentGet();} }

function wHutGet()
{
    if(gS.woodCount >= (20 * userNum) && gS.skinCount >= userNum) {
        gS.wHuts += userNum; gS.popMax += userNum * 3;
        gS.skinCount -= userNum; gS.woodCount -= userNum * 20;
        landAdd(); allChecks(); }
}
function wHut1()
{  userNum = 1; if(landCheck()){wHutGet();} }
function wHut10()
{  userNum = 10; if(landCheck()){wHutGet();} }
function wHut100()
{  userNum = 100; if(landCheck()){wHutGet();} }
function wHut1k()
{  userNum = 1000; if(landCheck()){wHutGet();} }

function cottageGet()
{
    if(gS.woodCount >= (10 * userNum) && gS.stoneCount >= (30 * userNum)) {
        gS.cottages += userNum; gS.popMax += userNum * 6;
        gS.stoneCount -= userNum * 30; gS.woodCount -= userNum * 10;
        landAdd(); allChecks(); }
}
function cottage1()
{  userNum = 1; if(landCheck()){cottageGet();}  }
function cottage10()
{  userNum = 10; if(landCheck()) {cottageGet();} }
function cottage100()
{  userNum = 100; if(landCheck()) {cottageGet();} }
function cottage1k()
{  userNum = 1000; if(landCheck()) {cottageGet();} }

function houseGet()
{
    if(gS.woodCount >= (30 * userNum) && gS.stoneCount >= (70 * userNum)) {
        gS.houses += userNum; gS.popMax += userNum * 10;
        gS.stoneCount -= userNum * 70; gS.woodCount -= userNum * 30;
        landAdd(); allChecks(); }
}
function house1()
{  userNum = 1; if(landCheck()){houseGet();}  }
function house10()
{  userNum = 10; if(landCheck()) {houseGet();} }
function house100()
{  userNum = 100; if(landCheck()) {houseGet();} }
function house1k()
{  userNum = 1000; if(landCheck()) {houseGet();} }

function mansionGet()
{
    if(gS.woodCount >= (200 * userNum) && gS.stoneCount >= (200 * userNum) && gS.leatherCount >= (20 * userNum)) {
        gS.mansions += userNum; gS.popMax += userNum * 50;
        gS.stoneCount -= userNum * 200; gS.woodCount -= userNum * 200; gS.leatherCount -= userNum * 20;
        landAdd(); allChecks(); }
}
function mansion1()
{  userNum = 1; if(landCheck()){mansionGet();}  }
function mansion10()
{  userNum = 10; if(landCheck()) {mansionGet();} }
function mansion100()
{  userNum = 100; if(landCheck()) {mansionGet();} }
function mansion1k()
{  userNum = 1000; if(landCheck()) {mansionGet();} }

function barnGet()
{
    if(gS.woodCount >= (100 * userNum)) {
        gS.barns += userNum; gS.foodCapAm += (userNum * 100) * 2;
        gS.woodCount -= userNum * 100;
        landAdd(); allChecks(); }
}
function barn1()
{  userNum = 1; if(landCheck()){barnGet();}  }
function barn10()
{  userNum = 10; if(landCheck()) {barnGet();} }
function barn100()
{  userNum = 100; if(landCheck()) {barnGet();} }
function barn1k()
{  userNum = 1000; if(landCheck()) {barnGet();} }

function woodSGet()
{
    if(gS.woodCount >= (100 * userNum)) {
        gS.woodStorage += userNum; gS.woodCapAm += (userNum * 100) * 2;
        gS.woodCount -= userNum * 100;
        landAdd(); allChecks(); }
}
function woodS1()
{  userNum = 1; if(landCheck()){woodSGet();}  }
function woodS10()
{  userNum = 10; if(landCheck()) {woodSGet();} }
function woodS100()
{  userNum = 100; if(landCheck()) {woodSGet();} }
function woodS1k()
{  userNum = 1000; if(landCheck()) {woodSGet();} }

function stoneSGet()
{
    if(gS.woodCount >= (100 * userNum)) {
        gS.stoneStockpiles += userNum; gS.stoneCapAm += (userNum * 100) * 2;
        gS.woodCount -= userNum * 100;
        landAdd(); allChecks(); }
}
function stoneS1()
{  userNum = 1; if(landCheck()){stoneSGet();}  }
function stoneS10()
{  userNum = 10; if(landCheck()) {stoneSGet();} }
function stoneS100()
{  userNum = 100; if(landCheck()) {stoneSGet();} }
function stoneS1k()
{  userNum = 1000; if(landCheck()) {stoneSGet();} }

function graveGet()
{
    if(gS.woodCount >= (50 * userNum) && gS.stoneCount >= (200 * userNum) && gS.herbCount >= (50 * userNum)) {
        gS.graveyards += userNum; 
        gS.stoneCount -= userNum * 200; gS.woodCount -= userNum * 50; gS.herbCount -= userNum * 50;
        landAdd(); allChecks(); }
}
function graves1()
{  userNum = 1; if(landCheck()){graveGet();}  }
function graves10()
{  userNum = 10; if(landCheck()) {graveGet();} }
function graves100()
{  userNum = 100; if(landCheck()) {graveGet();} }
function graves1k()
{  userNum = 1000; if(landCheck()) {graveGet();} }







