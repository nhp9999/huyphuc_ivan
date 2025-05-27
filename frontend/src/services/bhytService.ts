// Types and interfaces
export type BhytInfo = {
  maSoBHXH: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  diaChi: string;
  maThe: string;
  gtTheTu: string;
  gtTheDen: string;
  noiDKKCB: string;
  trangThai: string;
  mucHuong: string;
};

export type BhytLookupRequest = {
  maSoBHXH: string;
};

export type BhytLookupResponse = {
  success: boolean;
  data?: BhytInfo;
  message?: string;
};

class BhytService {
  private baseUrl = '/api/bhyt';

  async lookupBhyt(maSoBHXH: string): Promise<BhytLookupResponse> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${this.baseUrl}/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ maSoBHXH })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error looking up BHYT:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi tra cứu thông tin BHYT'
      };
    }
  }
}

export const bhytService = new BhytService();
