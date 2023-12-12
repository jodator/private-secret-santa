program secret_santa_v001.aleo;

record Ticket:
    owner as address.private;
    admin as address.private;
    gifted as address.private;

record Confirmation:
    owner as address.private;
    who as address.private;


mapping participants:
	key as address.public;
	value as u32.public;


mapping secret_gifts:
	key as address.public;
	value as u32.public;

function create:
    input r0 as address.private;
    input r1 as address.private;
    cast r0 self.caller r1 into r2 as Ticket.record;
    async create self.caller into r3;
    output r2 as Ticket.record;
    output r3 as secret_santa_v001.aleo/create.future;

finalize create:
    input r0 as address.public;
    get.or_use participants[r0] 0u32 into r1;
    add r1 1u32 into r2;
    set r2 into participants[r0];


function report_gift:
    input r0 as Ticket.record;
    assert.eq self.caller r0.owner;
    cast r0.admin self.caller into r1 as Confirmation.record;
    async report_gift r0.admin into r2;
    output r1 as Confirmation.record;
    output r2 as secret_santa_v001.aleo/report_gift.future;

finalize report_gift:
    input r0 as address.public;
    get secret_gifts[r0] into r1;
    add r1 1u32 into r2;
    set r2 into secret_gifts[r0];
