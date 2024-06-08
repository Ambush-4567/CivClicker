let gS = {
    woodCount: 0, foodCount: 0, stoneCount: 0,
    butt4On: false, butt5On: false, butt6On: false, butt7On: false, butt8On: false, butt9On: false, butt10On: false,
    wProduce: 1, fProduce: 1, sProduce: 1,
    woodCapAm: 200, foodCapAm: 200, stoneCapAm: 200,
    apples: 0, gapples: 0,
}

function startUp() 
{
    let jsonData = localStorage.getItem('gS');
    if (jsonData) { gS = JSON.parse(jsonData); } 

    document.getElementById('paragraph').style.visibility = 'hidden';
    document.getElementById('gappletxt').style.visibility = 'hidden';
    document.getElementById('gappletxt2').style.visibility = 'hidden';
    butDisable(); allChecks();
    timer = setInterval(checkUpgrade, 100);
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
        allChecks();
    } else {document.getElementById('butt1').removeAttribute('disabled'); }
}

function saveGame()
{
    let jsonData = JSON.stringify(gS);
    localStorage.setItem('gS', jsonData);
}

function storgClear()
{
    if (confirm("Are you sure you want to delete all data?")) {
        localStorage.clear();
        location.reload();
      } 
}

function appCheck()
{
    if (Math.ceil(Math.random() * 100) >= 98) {
        gS.apples += 1; document.getElementById('appletxt').innerHTML = gS.apples; }

      if (Math.ceil(Math.random() * 1000) >= 998 && gS.butt9On == true) {
        gS.gapples += 1; document.getElementById('gappletxt2').innerHTML = gS.gapples; }
}

function allChecks() 
{
    document.getElementById('para1').innerHTML = gS.woodCount;
    document.getElementById('para2').innerHTML = gS.foodCount;
    document.getElementById('para3').innerHTML = gS.stoneCount;
    document.getElementById('appletxt').innerHTML = gS.apples;
    document.getElementById('gappletxt2').innerHTML = gS.gapples;
    if(gS.butt9On == true) {
        document.getElementById('gappletxt').style.visibility = 'visible';
        document.getElementById('gappletxt2').style.visibility = 'visible'; }
}

function woodGet()
{
    gS.woodCount += gS.wProduce;
    allChecks(); appCheck(); saveGame();
}

function foodGet()
{
    gS.foodCount += gS.fProduce;
    allChecks(); saveGame();
}

function stoneGet()
{
    gS.stoneCount += gS.sProduce;
    allChecks(); saveGame();
}

function woodUp()
{
    gS.butt4On = true;
    gS.woodCount -= 100;
    gS.wProduce += 2;
    allChecks(); saveGame(); butDisable();
}

function woodMax()
{
    gS.butt5On = true;
    gS.woodCapAm = 400;
    gS.woodCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function foodMax()
{
    gS.butt6On = true;
    gS.foodCapAm = 400;
    gS.foodCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function stoneMax()
{
    gS.butt7On = true;
    gS.stoneCapAm = 400;
    gS.stoneCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function foodStoneUp()
{
    gS.butt8On = true;
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
    gS.butt9On = true;
    gS.woodCount -= 200; gS.foodCount -= 200; gS.stoneCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function winTrophy()
{
    gS.butt10On = true;
    gS.woodCount -= 400; gS.foodCount -= 400; gS.stoneCount -= 400;
    allChecks(); saveGame(); butDisable();
}

function butDisable()
{
    if(gS.butt4On == true) {
        document.getElementById('wrap2').style.visibility = 'hidden';
        document.getElementById('para12').style.visibility = 'visible'; } else {
        document.getElementById('wrap2').style.visibility = 'visible';
        document.getElementById('para12').style.visibility = 'hidden'; }
    if(gS.butt5On == true) {
            document.getElementById('wrap3').style.visibility = 'hidden';
            document.getElementById('para13').style.visibility = 'visible'; } else {
            document.getElementById('wrap3').style.visibility = 'visible';
            document.getElementById('para13').style.visibility = 'hidden'; }
    if(gS.butt6On == true) {
            document.getElementById('wrap4').style.visibility = 'hidden';
            document.getElementById('para14').style.visibility = 'visible'; } else {
            document.getElementById('wrap4').style.visibility = 'visible';
            document.getElementById('para14').style.visibility = 'hidden'; }
    if(gS.butt7On == true) {
            document.getElementById('wrap5').style.visibility = 'hidden';
            document.getElementById('para15').style.visibility = 'visible'; } else {
            document.getElementById('wrap5').style.visibility = 'visible';
            document.getElementById('para15').style.visibility = 'hidden'; }
    if(gS.butt8On == true) {
            document.getElementById('wrap6').style.visibility = 'hidden';
            document.getElementById('para16').style.visibility = 'visible'; } else {
            document.getElementById('wrap6').style.visibility = 'visible';
            document.getElementById('para16').style.visibility = 'hidden'; }
    if(gS.butt9On == true) {
            document.getElementById('wrap7').style.visibility = 'hidden';
            document.getElementById('para17').style.visibility = 'visible'; } else {
            document.getElementById('wrap7').style.visibility = 'visible';
            document.getElementById('para17').style.visibility = 'hidden'; }
        if(gS.butt10On == true) {
            document.getElementById('wrap8').style.visibility = 'hidden';
            document.getElementById('para18').style.visibility = 'visible'; } else {
            document.getElementById('wrap8').style.visibility = 'visible';
            document.getElementById('para18').style.visibility = 'hidden'; }
}
