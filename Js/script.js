const userinputs = document.querySelectorAll('input');
const zeroError = document.getElementById('error');
const resetbtn = document.getElementById('reset');
const percentbtn = document.querySelectorAll('button:not(#reset)');
const totalTip = document.getElementsByClassName('tiptotal')[0]; 
const totalAmt = document.getElementsByClassName('amounttotal')[0]; 

resetbtn.setAttribute('disabled','true');
resetbtn.style.opacity = '0.5';

// Initialize display
totalTip.textContent = '$0.00';
totalAmt.textContent = '$0.00';

percentbtn.forEach((per)=>{
    per.addEventListener('click',(e)=>{
        e.preventDefault();
        percentbtn.forEach((btn) => btn.classList.remove('clicked'));
        per.classList.add('clicked'); // Use add instead of toggle
        userinputs[1].value=''; // Clear custom input
        
        let bill = parseFloat(userinputs[0].value) || 0;
        let percentage = parseInt(per.textContent);
        let noofPeople = parseInt(userinputs[2].value) || 0;
        
        calculate(bill, percentage, noofPeople);
    })
})

// Clear button
userinputs[1].addEventListener('focus', (e) => {
    percentbtn.forEach(b => b.classList.remove('clicked'));
});

userinputs.forEach((input)=>{
    input.addEventListener('input',(e)=>{
        e.preventDefault();
        let bill = parseFloat(userinputs[0].value) || 0;
        let customNum = parseFloat(userinputs[1].value) || 0;
        let noofPeople = parseInt(userinputs[2].value) || 0;
        
        errorMessage(noofPeople);
        
        // Get percentage
        let percentage = customNum;
        if(!percentage) {
            const clickedBtn = document.querySelector('button.clicked');
            if(clickedBtn) {
                percentage = parseInt(clickedBtn.textContent);
            }
        }
        
        calculate(bill, percentage, noofPeople);
    })
})

function errorMessage(people){
    zeroError.textContent = ""
    userinputs[2].style.outline = ''
    if(people === 0){
        zeroError.textContent = "Can't be zero"
        userinputs[2].style.outline = '2px solid red'
    }
}

function calculate(bill, percentage, people){
    if(!bill || !percentage || !people || people === 0) {
        totalTip.textContent = '$0.00';
        totalAmt.textContent = '$0.00';
        return;
    }
    
    let tipAmount = (bill * percentage / 100) / people;
    let totalPerPerson = (bill / people) + tipAmount;
    
    totalTip.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmt.textContent = `$${totalPerPerson.toFixed(2)}`;
    
    resetbtn.removeAttribute('disabled');
    resetbtn.style.opacity = '1';
}

resetbtn.addEventListener('click', () => {
    userinputs.forEach(input => input.value = '');
    percentbtn.forEach(btn => btn.classList.remove('clicked'));
    
    totalTip.textContent = '$0.00';
    totalAmt.textContent = '$0.00';
    
    zeroError.textContent = '';
    userinputs[2].style.outline = '';
    
    resetbtn.setAttribute('disabled', 'true');
    resetbtn.style.opacity = '0.5';
})