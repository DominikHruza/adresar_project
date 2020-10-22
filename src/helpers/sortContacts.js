export const sortContacts = (contactsArray, orderString) => {
    //Sort in asc alphabet order
    if (orderString === "asc") {
        return contactsArray.sort(function (A, B) {
            const contactA = A.lastName.toLowerCase();
            const contactB = B.lastName.toLowerCase();

            if (contactA < contactB) {
                return -1;
            }
            if (contactA > contactB) {
                return 1;
            }
            return 0;
        });
        //Sort in desc alphabet order
    } else if (orderString === "desc") {
        return contactsArray.sort(function (A, B) {
            const contactA = A.lastName.toLowerCase();
            const contactB = B.lastName.toLowerCase();

            if (contactA > contactB) {
                return -1;
            }
            if (contactA < contactB) {
                return 1;
            }
            return 0;
        });
    }
};
