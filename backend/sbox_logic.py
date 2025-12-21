import numpy as np

# 1. Polinomial Irreduksibel AES: x^8 + x^4 + x^3 + x + 1 (0x11B)
# Sumber: [cite: 13, 39, 128, 1191]
AES_POLY = 0x11B 

# 2. Matriks Afin K44 (Performa Terbaik dalam Riset)
# Baris-baris ini diambil langsung dari hasil eksplorasi paper.
# Sumber: [cite: 1008, 1216, 1238]
K44_MATRIX = [
    0x57, 0xAB, 0xD5, 0xEA, 0x75, 0xBA, 0x5D, 0xAE
]

# 3. Konstanta Afin C_AES (0x63 atau 99 desimal)
# Sumber: [cite: 1202, 1204, 1213]
C_AES = 0x63 

def gf_multiply(a, b):
    """Perkalian di Galois Field GF(2^8)."""
    p = 0
    for _ in range(8):
        if b & 1:
            p ^= a
        hi_bit_set = a & 0x80
        a <<= 1
        if hi_bit_set:
            a ^= AES_POLY
        b >>= 1
    return p % 256

def gf_inverse(n):
    """Mencari Multiplicative Inverse di GF(2^8). [cite: 13, 1192]"""
    if n == 0:
        return 0
    for i in range(1, 256):
        if gf_multiply(n, i) == 1:
            return i
    return 0

def apply_affine_transformation(x_inv, matrix, constant):
    """
    Menerapkan Transformasi Afin: B(X) = (K . X^-1 + C) mod 2
    Sumber Rumus: 
    """
    x_inv_bin = format(x_inv, '08b')[::-1] # Ambil bit dari LSB ke MSB
    result_bin = []
    
    for row in matrix:
        row_bin = format(row, '08b')[::-1]
        # Perkalian dot product (AND) lalu jumlahkan mod 2 (XOR)
        bit_sum = 0
        for i in range(8):
            bit_sum ^= (int(x_inv_bin[i]) & int(row_bin[i]))
        result_bin.append(str(bit_sum))
    
    # Gabungkan bit hasil dan tambahkan konstanta (XOR)
    res_int = int("".join(result_bin[::-1]), 2)
    return res_int ^ constant

def generate_sbox44():
    """Menghasilkan tabel S-box 44 lengkap (256 nilai). [cite: 134, 1271]"""
    sbox = []
    for i in range(256):
        inv = gf_inverse(i)
        val = apply_affine_transformation(inv, K44_MATRIX, C_AES)
        sbox.append(val)
    return sbox

# Testing sederhana
if __name__ == "__main__":
    sbox = generate_sbox44()
    print("S-box 44 (16x16 Row 0):")
    print([hex(x) for x in sbox[:16]])