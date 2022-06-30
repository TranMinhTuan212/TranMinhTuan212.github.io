let open=document.querySelectorAll('.tablet__board__row__topic');
let thisclass=document.querySelectorAll('.tablet__row__boxhiiden');
let check=false;

for(let i=0;i<open.length-1;i++)
{
    open[i].onclick=()=>{
        if(check==false)
        {
            thisclass[i].style.display='block';
            check=true;
        }
        else
        {
            thisclass[i].style.display='none';
            check=false;
        }
    }
}