import os

from api.report import create_docx_report


def test_create_report():

    json_id = 'l1'
    out_path = '/root/public/data/report.docx'

    create_docx_report(json_id)

    assert os.path.exists(out_path)