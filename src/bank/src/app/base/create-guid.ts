export class Guid{
    public uuid(): string{
        var uuidValue = "", index, ramdomValue;
        for (index = 0; index < 32; index++) {
            ramdomValue = Math.random() *16 | 0;
            if (index == 8 || index == 12 || index == 16 || index == 20) {
                uuidValue += '-';
            }

            uuidValue += (index == 12 ? 4 : (index == 16 ? (ramdomValue & 3 | 8):ramdomValue )).toString(16);
        }
        return uuidValue;
    }
}