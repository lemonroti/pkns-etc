const results=document.querySelector('#results');
function report(name,passed,error=''){const item=document.createElement('li');item.textContent=`${passed?'PASS':'FAIL'} — ${name}${error?`: ${error}`:''}`;item.dataset.status=passed?'pass':'fail';results.append(item)}
async function test(name,fn){try{await fn();report(name,true)}catch(error){report(name,false,error.message)}}
await test('index.html exposes #app mount point',async()=>{const html=await fetch('../index.html').then(r=>r.text());if(!html.includes('id="app"'))throw new Error('Missing #app mount')});
export {test};
