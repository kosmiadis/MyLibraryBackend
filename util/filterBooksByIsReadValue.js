export async function filterBooksByIsReadValue (books, validValue) {
    return books.filter(b => b.isRead === validValue);
}