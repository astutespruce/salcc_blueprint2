FROM alpine:3.10

# Dependencies are managed parallel to Pipfile to make sure we get alpine compatible versions
RUN echo "http://dl-8.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk add --update --no-cache \ 
    python3 \
    py3-pillow \
    py3-matplotlib \
    py3-lxml && \
    pip3 install \
    flask==1.1.1 \
    requests==2.22.0 \
    raven[flask] \
    python-docx==0.8.10 \
    gunicorn==19.9.0

# Make sure python finds the packages installed via apk
ENV PYTHONPATH=/usr/lib/python3.7/site-packages

# Copy python API and data
COPY ./api /api
COPY ./src/config /api/config
COPY ./build/data /api/data
ENV DATA_DIR=/api/data
ENV CONFIG_DIR=/api/config

CMD ["gunicorn", "-b", "0.0.0.0:8000", "api:app"]

