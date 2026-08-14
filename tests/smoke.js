import{coreValues,boardMembers,managementTeam,missions,clqProjects,comingSoonProjects}from'../js/data.js';
import{compactEntries,getInitials,getSafeExternalHref}from'../js/utils/content.js';
const results=document.querySelector('#results');
function report(name,passed,error=''){const item=document.createElement('li');item.textContent=`${passed?'PASS':'FAIL'} — ${name}${error?`: ${error}`:''}`;item.dataset.status=passed?'pass':'fail';results.append(item)}
async function test(name,fn){try{await fn();report(name,true)}catch(error){report(name,false,error.message)}}
await test('index.html exposes #app mount point',async()=>{const html=await fetch('../index.html').then(r=>r.text());if(!html.includes('id="app"'))throw new Error('Missing #app mount')});
await test('client content counts remain intact',()=>{if(coreValues.length!==7)throw new Error('Expected 7 core values');if(boardMembers.length!==4)throw new Error('Expected 4 directors');if(managementTeam.length!==4)throw new Error('Expected 4 management members');if(missions.length!==7)throw new Error('Expected 7 mission statements');if(clqProjects.length!==3)throw new Error('Expected 3 detailed CLQ projects');if(comingSoonProjects.length!==3)throw new Error('Expected 3 coming-soon projects')});
await test('optional project fields are removable',()=>{const rows=compactEntries([['Address',null],['Beds',3824]]);if(rows.length!==1||rows[0][0]!=='Beds')throw new Error('Optional field filtering failed')});
await test('content helpers handle fallbacks safely',()=>{if(getInitials('Kamaruzain bin Kamisan')!=='KB')throw new Error('Initials helper failed');if(getSafeExternalHref('javascript:alert(1)')!==null)throw new Error('Unsafe URL accepted')});
export{test};
