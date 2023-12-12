program secret_santa_v001.aleo {
    record Ticket {
        admin: address,
        gifted: address,
        owner: address,
    }

    record Confirmation {
        who: address,
        owner: address,
    }

    mapping participants: address => u32;
    mapping secret_gifts: address => u32;

    transition create(secret_santa: address, gifted: address) -> Ticket {
        return Ticket {
            admin: self.caller,
            gifted: gifted,
            owner: secret_santa,
        } then finalize self.caller;
    }

    finalize create(admin: address) {
        let current: u32 = Mapping::get_or_use(participants, admin, 0u32);
        Mapping::set(participants, admin, current + 1u32);
    }

    transition report_gift(private ticket: Ticket) -> Confirmation {
        assert_eq(self.caller, ticket.owner);
        let confirmation: Confirmation = Confirmation {
            who: self.caller,
            owner: ticket.admin,
        };
        return confirmation then finalize ticket.admin;
    }

    finalize report_gift(admin: address) {
        let current: u32 = Mapping::get(secret_gifts, admin);
        Mapping::set(secret_gifts, admin, current + 1u32);
    }
}
