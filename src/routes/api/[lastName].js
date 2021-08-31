/*import faker from "faker";

export async function get({ params }) {
    const { lastName } = params;
    return {
        body: {
            lastName,
            firstName: faker.name.firstName(),
            avatar: `https://avatars.dicebear.com/api/human/${lastName}.svg`,
            title: faker.name.title(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
        },
    };
}*/

import supabase from '$lib/db';

export async function get({ params }) {
    const { lastName } = params;
    const firstName = await supabase.from('fakeUsers').select(`firstName`).match({lastName: lastName});
    const title = await supabase.from('fakeUsers').select(`title`).match({lastName: lastName});
    return {
        body: {
            lastName,
            firstName: firstName.data[0].firstName,
            title: title.data[0].title
        },
    };
}