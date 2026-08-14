export function compactEntries(entries){return entries.filter(([,value])=>value!==null&&value!==undefined&&value!=='')}
export function getInitials(name=''){return name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0].toUpperCase()).join('')}
export function getSafeExternalHref(url){if(!url)return null;try{const parsed=new URL(url);return ['http:','https:'].includes(parsed.protocol)?parsed.href:null}catch{return null}}
