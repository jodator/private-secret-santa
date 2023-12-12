program secret_santa_v001.aleo {
    record GiftTag {
        organizer: address,
        recipient: address,
        owner: address,
    }

    record Confirmation {
        who: address,
        owner: address,
    }

    mapping participants: address => u32;
    mapping secret_gifts: address => u32;

    transition add_gift_tag(owner: address, gift_recipient: address) -> GiftTag {
        return GiftTag {
            organizer: self.caller,
            recipient: gift_recipient,
            owner: owner,
        } then finalize self.caller;
    }

    finalize add_gift_tag(organizer: address) {
        let current: u32 = Mapping::get_or_use(participants, organizer, 0u32);
        Mapping::set(participants, organizer, current + 1u32);
    }

    transition report_gift(private tag: GiftTag) -> Confirmation {
        assert_eq(self.caller, tag.owner);
        let confirmation: Confirmation = Confirmation {
            who: self.caller,
            owner: tag.organizer,
        };
        return confirmation then finalize tag.organizer;
    }

    finalize report_gift(organizer: address) {
        let current: u32 = Mapping::get(secret_gifts, organizer);
        Mapping::set(secret_gifts, organizer, current + 1u32);
    }
}
