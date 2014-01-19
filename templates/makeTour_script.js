totalChecked = 0;

window.onload = function () {

    allCBox = document.getElementsByClassName ("chkbox");
    for (i=0; i < allCBox.length; i++) {
	console.log ("CHECKING YOUR CHECKBOX")
	console.log (allCBox[i]);
	allCBox[i].disabled = true;
	console.log (allCBox[i].disabled);
	console.log (allCBox[i].checked);
    };

    alert ("loaded");
    document.getElementById("dialog").innerHTML = "";

    for (var i=1;i<={{locLen}};i++) {
	strIt = i.toString();
	divName = "myDiv" + strIt
        var loc = JSON.parse('{{locs | tojson | safe}}');
	imgTxt = loc[i-1][5];
	phyImg = loc[i-1][3];

	var imgSc = document.getElementById(divName);
	
	imgSc.onclick = function () {

	    var source = this.getElementsByTagName('img')[0];
	    var phyImg = source.src;
	    num = this.id.substring (5);
	    chkId = "myChk" + num;
	    
	    var titleImg  = this.getElementsByTagName('h2')[0].innerHTML;
	    var addressImg  = this.getElementsByTagName('p')[0].innerHTML;
	    var ratingImg  = this.getElementsByTagName('p')[0].innerHTML;
	    chk = document.getElementById (chkId);

	    console.log ("AM I CHECKED?");
	    console.log (chk.checked);

	    document.getElementById("dialog").innerHTML = "";
	    var iDiv = document.getElementById("dialog");
	    var txtNd=document.createTextNode(imgTxt);
	    iDiv.appendChild(txtNd);

	    var imgpop = document.createElement("img");
	    imgpop.setAttribute("src", phyImg );
	    imgpop.setAttribute("height", "350");
	    imgpop.setAttribute("width", "350");

	    iDiv.appendChild(imgpop);

	    $("#dialog").dialog({
		modal:true, 
		title: titleImg,
		height: "auto",
		width: "auto",
		buttons: {
		    Select: function () {
		        if (chk.checked === true) {
			    alert ("You have already selected this location.");}
			else {
			    if (totalChecked < 3) {
			        console.log ("SELECTING YOUR CHECKBOX");
				chk.checked = true;
			        console.log (chk.checked);
				totalChecked = totalChecked + 1;
				$(this).dialog('close');}
			    else {
				alert ("You Cannot Select this Location. You have already met the maximum of three stops.");}
			}},
		    
		    Unselect: function () {
			chk.checked = false;
			totalChecked = totalChecked - 1;
			$(this).dialog('close');},

		    Close: function() {
			$( this ).dialog( "close" );
		    }}});

	};
    };
};

$(document).ready(function(){

    console.log ("TURNING STUFF BLUE");
    highlighter =  $('.location input[type=checkbox]');
    console.log (highlighter);
    highlighter.change (function () {
	$(this).parent().toggleClass('active', this.checked);
    });
});
