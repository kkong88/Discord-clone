from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired


class UpdateServer(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    images = FileField('images')
