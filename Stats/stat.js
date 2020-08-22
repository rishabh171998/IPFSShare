const checkStats=(NodeStats)=>{
NodeStats.on('update',(stats)=>
{
    console.log('Lastest Stats:%j',stats);
    const snapshot = stats.snapshot
console.log('stats: %j', snapshot)
});
}
module.exports.Stats=checkStats;

